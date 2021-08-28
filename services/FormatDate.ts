export const formatDate = (dateString: string) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[new Date(dateString).getDay()];
  let time = dateString.split(" ");
  return [dayName, time[1]];
};
