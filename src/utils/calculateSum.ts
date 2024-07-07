function parseTimeToDecimal(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours + minutes / 60;
}

function convertDecimalToTime(decimal: number): string {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

export function sumTimeStrings(times: string[]): string {
  const total = times.reduce((sum, time) => sum + parseTimeToDecimal(time), 0);

  // Adjust if minutes exceed 60
  const totalHours = Math.floor(total);
  const totalMinutes = Math.round((total - totalHours) * 60);

  let adjustedHours = totalHours;
  let adjustedMinutes = totalMinutes;

  if (totalMinutes >= 60) {
    adjustedHours += Math.floor(totalMinutes / 60);
    adjustedMinutes = totalMinutes % 60;
  }

  return convertDecimalToTime(adjustedHours + adjustedMinutes / 60);
}
