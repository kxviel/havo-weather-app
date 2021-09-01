import { filterForecastIcon, filterWeatherIcon } from "../services/FilterSVG";
import { useCallback, useEffect, useState } from "react";
import { api } from "../services/API";
import axios from "axios";
import Current from "../components/Current";
import Details from "../components/Details";
import { Inputs } from "../Interfaces/Form.type";
import { CurrentWeather } from "../Interfaces/CurrentWeather.type";
import { Icon } from "../Interfaces/Icon.type";
import { Forecast } from "../Interfaces/Forecast.type";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  const [iconArray, setIconArray] = useState<Array<string>>([]);
  const [fallbackIcon, setFallbackArray] = useState<Array<string>>([]);
  const [isValid, setIsValid] = useState<boolean>(false);
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
        if (res.status != 200) {
          alert("ERROR, Sorry :(");
          localStorage.clear();
          router.push("/");
        }

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
        //For Current
        let icon = filterWeatherIcon(current.condition.code);
        if (icon !== undefined) {
          setIsValid(true);
          setSVGIndex(icon as Icon);
        } else {
          setIsValid(false);
        }
        //For Forecast
        let arr = forecast.hour.map((x) => x.condition.code);
        let fallback = forecast.hour.map((x) => `https:${x.condition.icon}`);
        setFallbackArray(fallback);
        let iconArray = [];
        for (let index = 0; index < arr.length; index++) {
          iconArray.push(
            filterForecastIcon(arr[index], forecast.hour[index].is_day)
          );
        }
        setIconArray(iconArray);
      })
      .catch((err) => {
        alert("Location Entered Doesnt Exist in Our Database, Sorry :(");
        localStorage.clear();
        router.push("/");
      });
  }, [current.condition.code, forecast.hour, router]);

  useEffect(() => {
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
            {iconArray[7] !== undefined && fallbackIcon[7] !== undefined && (
              <Details
                currentWeather={current}
                iconArray={iconArray}
                fallbackIcon={fallbackIcon}
                forecast={forecast}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
