export const UV = (uv: number) => {
  if (uv < 3) return "Low";
  else if (uv < 6 && uv >= 3) return "Moderate";
  else if (uv < 8 && uv >= 6) return "High";
  else if (uv < 11 && uv >= 8) return "Very High";
  else if (uv >= 11) return "Extreme";
};
export const WindDirection = (dir: string) => {
  if (dir == "N") return "↑";
  else if (dir == "NE") return "⭧";
  else if (dir == "NW") return "⭦";
  else if (dir == "SE") return "⭨";
  else if (dir == "SW") return "⭩";
  else if (dir == "S") return "↓";
  else if (dir == "E") return "→";
  else if (dir == "W") return "←";
};
export const Humidity = (hum: number) => {
  if (hum <= 45) return "Ok";
  else if (hum >= 50 && hum <= 79) return "Mild";
  else if (hum >= 80 && hum <= 89) return "Severe";
  else if (hum >= 90 && hum <= 98) return "Extreme";
};
export const Visibility = (vis: number) => {
  if (vis >= 7) return "Good";
  else if (vis <= 6 && vis > 2) return "Average";
  else if (vis <= 1) return "Bad";
};
export const AQI = (co: number) => {
  if (co <= 33) return "Excellent";
  else if (co >= 34 && co <= 70) return "Good";
  else if (co >= 71 && co <= 100) return "Fair";
  else if (co >= 101 && co <= 149) return "Poor";
  else if (co >= 151 && co <= 200) return "Very Poor";
  else if (co > 200) return "Hazardous";
};
