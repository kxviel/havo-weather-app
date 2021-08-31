export type CurrentWeather = {
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
};
