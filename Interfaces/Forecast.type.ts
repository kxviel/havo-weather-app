export type Forecast = {
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
  };
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
  };
  hour: [
    {
      condition: {
        code: number;
        icon: string;
      };
      is_day: number;
      temp_c: number;
      temp_f: number;
    }
  ];
};
