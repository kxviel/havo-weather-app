import { CurrentWeather } from "./CurrentWeather.type";
import { Icon } from "./Icon.type";

export type CurrentWeatherProps = {
  sendDataCallback: Function;
  isValid: boolean;
  current: CurrentWeather;
  svg: Icon;
  location: string;
};
