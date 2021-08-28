import { Inputs, Icon, Response } from "../utils/Interfaces";
import { filterWeatherIcon } from "../services/FilterSVG";
import { useCallback, useEffect, useState } from "react";
import AppBar from "../components/Current";
import { api } from "../services/creds";
import Image from "next/image";
import axios from "axios";
import Current from "../components/Current";

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
        console.log(data);
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
          <div className="root__body__forecast">s</div>
        </div>
      </div>
    </>
  );
};

export default Main;
