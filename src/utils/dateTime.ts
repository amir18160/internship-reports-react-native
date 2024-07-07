import { parseISO, startOfWeek, compareAsc } from "date-fns";
import { format } from "date-fns-jalali";

export function getCurrentWeekRange() {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 6 });

  return [startDate.toISOString(), today.toISOString()];
}

export function getPreviusWeekRange() {
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 6 });
  const previusWeekStart = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  return [previusWeekStart.toISOString(), startDate.toISOString()];
}

export function last30Days() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  return [thirtyDaysAgo.toISOString(), today.toISOString()];
}

export function isFirstDateAfterSecond(date1: string, date2: string) {
  return compareAsc(date1, date2);
}

export function convertIsoToPersianDate(isoTime: string) {
  const date = parseISO(isoTime);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  const formattedInJalali = format(new Date(year, month, day), "yyyy-MM-dd");
  const slicedDate = formattedInJalali.split("-");

  const jalaliYear = slicedDate[0];
  const jalaliMonth = slicedDate[1];
  const jalaliDay = slicedDate[2];
  const jalaliDayOfWeek = convertToPersianDayOfWeek(dayOfWeek);

  const dateString = `${slicedDate[0]}/${slicedDate[1]}/${slicedDate[2]}`;

  return {
    year: jalaliYear,
    month: jalaliMonth,
    day: jalaliDay,
    dayOfWeek: jalaliDayOfWeek,
    dateString,
  };
}

function convertToPersianDayOfWeek(dayOfWeek: number): string {
  switch (dayOfWeek) {
    case 0:
      return "یک‌شنبه";
    case 1:
      return "دوشنبه";
    case 2:
      return "سه‌شنبه";
    case 3:
      return "چهارشنبه";
    case 4:
      return "پنج‌شنبه";
    case 5:
      return "جمعه";
    case 6:
      return "شنبه";
    default:
      return "";
  }
}
