import { ReportType } from "types/ReportType";
import { convertIsoToPersianDate } from "./dateTime";

export function isTodaysReportAlreadyExist(
  reports: ReportType[],
): [boolean, ReportType | null] {
  const today = convertIsoToPersianDate(new Date().toISOString()).dateString;

  const filtered = reports.filter((data) => {
    const reportDate = convertIsoToPersianDate(data.date).dateString;
    if (today === reportDate) {
      return true;
    }
    return false;
  });

  return [filtered.length === 1, filtered[0]];
}
