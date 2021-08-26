export interface Inputs {
  location: string;
}

export interface Icon {
  day_link: string;
  night_link: string;
}

export interface Response {
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

export interface AppBarProps {
  sendDataCallback: Function;
}
