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

export function calculateDistanceFrom20(time: string): {
  distance: string;
  below20: boolean;
} {
  const targetTime = parseTimeToDecimal(time);
  const twenty = 20;
  const distance = targetTime < twenty ? twenty - targetTime : targetTime - twenty;
  const below20 = targetTime < twenty;

  const distanceTime = convertDecimalToTime(distance);

  return { distance: distanceTime, below20 };
}
