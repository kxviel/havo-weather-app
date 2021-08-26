import { data } from "./WeatherData";

export const filterWeatherIcon = (apiCode: number) => {
  const filteredData = data.filter((x) => apiCode === x.code);
  return filteredData[0];
};
