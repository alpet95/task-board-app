// === DATE --------------------------------
export const MONTHS: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const WEEKDAYS: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thur",
  "Fri",
  "Sat",
];

// === DATE & TIME FUNCTIONS ---------------
export function GET_DATE(date: Date): string {
  let weekday = WEEKDAYS[date.getDay()];
  let day = date.getDate();
  let month = MONTHS[date.getMonth()];
  return `${weekday}, ${day} ${month}`;
}

export function GET_TIME(date: Date): string {
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return `${hour}:${minutes}`;
}
