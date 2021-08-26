import { Inputs, Icon, Response } from "../utils/Interfaces";
import { filterWeatherIcon } from "../services/FilterSVG";
import { useCallback, useEffect, useState } from "react";
import AppBar from "../components/Appbar";
import { api } from "../services/creds";
import Image from "next/image";
import axios from "axios";

const Main = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [svgIndex, setSVGIndex] = useState<Icon>({
    day_link: "/default.svg",
    night_link: "/default.svg",
  });
  const [current, setCurrent] = useState<Response>({
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

  const onSubmit = (data: Inputs) => {
    localStorage.setItem("city", data.location);
    getWeather();
  };

  const getWeather = useCallback(() => {
    let city = localStorage.getItem("city") as string;
    axios
      .get(`${api}${city}`)
      .then((res) => {
        setLocation(res.data.location.name);

        let data = {};
        for (let key in res.data.current) {
          if (res.data.current.hasOwnProperty(key)) {
            let value = res.data.current[key];
            data = { ...data, [key]: value };
          }
        }
        setCurrent(data as Response);
      })
      .finally(() => {
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
    getWeather();
  }, [getWeather]);

  return (
    <>
      <AppBar sendDataCallback={(data: Inputs) => onSubmit(data)} />
      <div className="root">
        <div className="root__body">
          <div className="root__body__current">
            <div className="root__body__current__svg">
              {current.condition.icon != "" && (
                <Image
                  height="177"
                  width="177"
                  alt="SVG"
                  src={
                    !isValid
                      ? `https://${current.condition.icon}`
                      : current.is_day === 1
                      ? `${svgIndex?.day_link}`
                      : `${svgIndex?.night_link}`
                  }
                />
              )}
            </div>
            <div className="root__body__current__details">
              <h1>{location}</h1>
              <p>{current.temp_c}</p>
              <p>{current.condition.text}</p>
              <p>Precipitation: {current.precip_mm}</p>
            </div>
          </div>
          <div className="root__body__forecast">s</div>
        </div>
      </div>
    </>
  );
};

export default Main;
