import { Icon } from "../Interfaces/Interfaces";
import { data } from "../utils/WeatherData";

export const filterWeatherIcon = (apiCode: number) => {
  const filteredData = data.filter((x) => apiCode === x.code);
  return filteredData[0];
};

export const filterForecastIcon = (apiCode: number, is_day: number) => {
  const filteredData: Icon[] = data.filter((x) => apiCode === x.code);
  if (is_day === 1) {
    return filteredData[0].day_link;
  } else {
    return filteredData[0].night_link;
  }
};
