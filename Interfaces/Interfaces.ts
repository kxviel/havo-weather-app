export interface Inputs {
  location: string;
}

export interface Icon {
  day_link: string;
  night_link: string;
}

export interface Response {
  air_quality: {
    co: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
    so2: number;
  };
  feelslike_c: number;
  humidity: number;
  last_updated: string;
  precip_mm: number;
  pressure_mb: number;
  temp_c: number;
  uv: number;
  vis_km: number;
  wind_dir: string;
  wind_kph: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
}

export interface CurrentProps {
  sendDataCallback: Function;
  isValid: boolean;
  current: Response;
  svg: Icon;
  location: string;
}
export interface DetailProps {
  forecast: ForecastProps;
  currentWeather: Response;
  isLoading: boolean;
}

export interface ForecastProps {
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
}
