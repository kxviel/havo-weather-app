import Image from "next/image";
import { useState } from "react";
import Grid from "./Grid";
import { timeList } from "../utils/TimeList";
import { ForecastProps } from "../Interfaces/ForecastProps.type";

const Details = (props: ForecastProps) => {
  const [isCelcius, setIsCelcius] = useState<boolean>(true);
  const setFaranheit = () => {
    props.degreeState(false);
    setIsCelcius(false);
  };
  const setCelcius = () => {
    props.degreeState(true);
    setIsCelcius(true);
  };

  return (
    <>
      <div className="root__body__weatherDetails__header">
        <p>Weather | Today</p>
        <div className="root__body__weatherDetails__header__deg">
          <button
            onClick={setCelcius}
            className="root__body__weatherDetails__header__deg--c"
          >
            C
          </button>
          <button
            onClick={setFaranheit}
            className="root__body__weatherDetails__header__deg--f"
          >
            F
          </button>
        </div>
      </div>
      <div className="root__body__weatherDetails__forecast">
        {props.forecast.hour.map((x, i) => (
          <div key={i} className="root__body__weatherDetails__forecast__hour">
            <h3>{isCelcius ? `${x.temp_c}° C` : `${x.temp_f}° F`}</h3>
            <p>{timeList[i]}</p>
            <Image
              height={props.iconArray[i] !== undefined ? "77" : "49"}
              width={props.iconArray[i] !== undefined ? "70" : "49"}
              alt="SVG"
              src={
                props.iconArray[i] !== undefined
                  ? props.iconArray[i]
                  : props.fallbackIcon[i]
              }
            />
          </div>
        ))}
      </div>
      <Grid
        currentWeather={props.currentWeather}
        forecastWeather={props.forecast}
      />
    </>
  );
};

export default Details;
