import { DetailProps, Icon } from "../Interfaces/Interfaces";
import Image from "next/image";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import { filterForecastIcon, filterWeatherIcon } from "../services/FilterSVG";
import { timeList } from "../utils/TimeList";

const Details = (props: DetailProps) => {
  const [iconArray, setIconArray] = useState<Array<string>>([]);

  useEffect(() => {
    let arr = props.forecast.hour.map((x) => x.condition.code);
    let iconArray = [];
    if (!props.isLoading) {
      for (let index = 0; index < arr.length; index++) {
        iconArray.push(
          filterForecastIcon(arr[index], props.forecast.hour[index].is_day)
        );
      }
      setIconArray(iconArray);
    }
  }, [props]);

  return (
    <>
      <div className="root__body__weatherDetails__header">
        <p>Weather | Today</p>
        <div className="root__body__weatherDetails__header__deg">
          <button className="root__body__weatherDetails__header__deg--c">
            C
          </button>
          <button className="root__body__weatherDetails__header__deg--f">
            F
          </button>
        </div>
      </div>
      <div className="root__body__weatherDetails__forecast">
        {props.forecast.hour.map((x, i) => {
          return (
            <div key={i} className="root__body__weatherDetails__forecast__hour">
              <h3>{x.temp_c}</h3>
              <p>{timeList[i]}</p>
              <Image
                height="63"
                width="63"
                alt="SVG"
                src={iconArray[i] !== undefined ? iconArray[i] : "/default.svg"}
              />
            </div>
          );
        })}
      </div>
      <Grid
        currentWeather={props.currentWeather}
        forecastWeather={props.forecast}
      />
    </>
  );
};

export default Details;
