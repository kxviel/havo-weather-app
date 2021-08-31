import { filterWeatherIcon } from "../services/FilterSVG";
import { useCallback, useEffect, useState } from "react";
import { api } from "../services/API";
import axios from "axios";
import Current from "../components/Current";
import Details from "../components/Details";
import { Inputs } from "../Interfaces/Form.type";
import { CurrentWeather } from "../Interfaces/CurrentWeather.type";
import { Icon } from "../Interfaces/Icon.type";
import { Forecast } from "../Interfaces/Forecast.type";

const Main = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<string>("");
  const [svgIndex, setSVGIndex] = useState<Icon>({
    day_link: "/default.svg",
    night_link: "/default.svg",
  });
  const [current, setCurrent] = useState<CurrentWeather>({
    air_quality: {
      co: 0,
      no2: 0,
      o3: 0,
      pm2_5: 0,
      pm10: 0,
      so2: 0,
    },
    feelslike_c: 0,
    humidity: 0,
    last_updated: "",
    precip_mm: 0,
    pressure_mb: 0,
    temp_c: 0,
    uv: 0,
    vis_km: 0,
    wind_dir: "",
    wind_kph: 0,
    is_day: 0,
    condition: {
      text: "",
      icon: "",
      code: 0,
    },
  });
  const [forecast, setForecast] = useState<Forecast>({
    astro: {
      sunrise: "",
      sunset: "",
      moonrise: "",
      moonset: "",
      moon_phase: "",
    },
    date: "",
    day: {
      maxtemp_c: 0,
      maxtemp_f: 0,
      mintemp_f: 0,
      mintemp_c: 0,
      avgtemp_c: 0,
    },
    hour: [
      {
        condition: {
          code: 0,
          icon: "/default.svg",
        },
        is_day: 0,
        temp_c: 0,
        temp_f: 0,
      },
    ],
  });

  const onSubmit = (data: Inputs) => {
    localStorage.setItem("city", data.location);
    getWeather();
  };

  const getWeather = useCallback(() => {
    let city = localStorage.getItem("city") as string;
    axios
      .get(`${api}${city}&aqi=yes`)
      .then((res) => {
        setLocation(res.data.location.name);

        let data = {};
        for (let key in res.data.current) {
          if (res.data.current.hasOwnProperty(key)) {
            let value = res.data.current[key];
            data = { ...data, [key]: value };
          }
        }
        setCurrent(data as CurrentWeather);

        let forecastData = {};
        for (let key in res.data.forecast.forecastday[0]) {
          if (res.data.forecast.forecastday[0].hasOwnProperty(key)) {
            let value = res.data.forecast.forecastday[0][key];
            forecastData = { ...forecastData, [key]: value };
          }
        }
        setForecast(forecastData as Forecast);
      })
      .finally(() => {
        setIsLoading(false);
        let icon = filterWeatherIcon(current.condition.code);
        if (icon !== undefined) {
          setIsValid(true);
          setSVGIndex(icon as Icon);
        } else {
          setIsValid(false);
        }
      })
      .catch((err) => console.log(err));
  }, [current.condition.code]);

  useEffect(() => {
    setIsLoading(true);
    getWeather();
  }, [getWeather]);

  return (
    <>
      <div className="root">
        <div className="root__body">
          <div className="root__body__current">
            <Current
              location={location}
              isValid={isValid}
              current={current}
              svg={svgIndex}
              sendDataCallback={(data: Inputs) => onSubmit(data)}
            />
          </div>
          <div className="root__body__weatherDetails">
            <Details
              currentWeather={current}
              isLoading={isLoading}
              forecast={forecast}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
