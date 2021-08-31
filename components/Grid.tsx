import Image from "next/image";
import { useEffect, useState } from "react";
import { GridProps } from "../Interfaces/Grid.type";
import {
  AQI,
  Humidity,
  UV,
  Visibility,
  WindDirection,
} from "../services/Rating";

const Grid = (props: GridProps) => {
  const [rating, setRating] = useState<(any | void)[]>([]);
  useEffect(() => {
    let arr = [];
    arr.push(UV(props.currentWeather.uv));
    arr.push(WindDirection(props.currentWeather.wind_dir));
    arr.push(Humidity(props.currentWeather.humidity));
    arr.push(Visibility(props.currentWeather.vis_km));
    arr.push(AQI(props.currentWeather.air_quality.co));
    setRating(arr);
  }, [props]);

  return (
    <div className="root__body__weatherDetails__grid">
      <div className="root__body__weatherDetails__grid__item">
        <p>UV Index</p>
        <div className="root__body__weatherDetails__grid__item__subitem">
          <Image src="/uv.png" height="56" width="56" alt="uvi" />
          <h1>{props.currentWeather.uv}</h1>
        </div>
        <p>{rating[0]}</p>
      </div>
      <div className="root__body__weatherDetails__grid__item">
        <p>Wind Status</p>
        <div className="root__body__weatherDetails__grid__item__subitem">
          <Image src="/wind.png" height="56" width="56" alt="uvi" />
          <h1>{props.currentWeather.wind_kph}</h1>
        </div>
        <p>
          {props.currentWeather.wind_dir} {rating[1]}
        </p>
      </div>
      <div className="root__body__weatherDetails__grid__item">
        <p>Sunrise & Sunset</p>
        <div className="root__body__weatherDetails__grid__item__row">
          <Image src="/sunrise.png" height="49" width="49" alt="uvi" />
          <h1>{props.forecastWeather.astro.sunrise}</h1>
        </div>
        <div className="root__body__weatherDetails__grid__item__row">
          <Image src="/sunset.png" height="49" width="49" alt="uvi" />
          <h1>{props.forecastWeather.astro.sunset}</h1>
        </div>
      </div>
      <div className="root__body__weatherDetails__grid__item">
        <p>Humidity</p>
        <div className="root__body__weatherDetails__grid__item__subitem">
          <Image src="/humidity.png" height="56" width="56" alt="uvi" />
          <h1>{props.currentWeather.humidity}</h1>
        </div>
        <p>{rating[2]}</p>
      </div>
      <div className="root__body__weatherDetails__grid__item">
        <p>Visibility</p>
        <div className="root__body__weatherDetails__grid__item__subitem">
          <Image src="/visibility.png" height="56" width="56" alt="uvi" />
          <h1>{props.currentWeather.vis_km}</h1>
        </div>
        <p>{rating[3]}</p>
      </div>
      <div className="root__body__weatherDetails__grid__item">
        <p>Air Quality</p>
        <div className="root__body__weatherDetails__grid__item__subitem">
          <Image src="/AQI.png" height="56" width="56" alt="uvi" />
          <h1>{Math.round(props.currentWeather.air_quality.co)}</h1>
        </div>
        <p>{rating[4]}</p>
      </div>
    </div>
  );
};

export default Grid;
