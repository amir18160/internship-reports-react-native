export default function correctTimeInput(input: string | number): string {
  const timeString = input.toString().trim();

  const invalidCharsRegex = /[^0-9:.]/;
  if (invalidCharsRegex.test(timeString)) {
    throw new Error("Invalid time format: input contains invalid characters");
  }

  if (String.length > 5) {
    throw new Error("invalid format!");
  }

  if (timeString.includes(":")) {
    const [hours, minutes] = timeString.split(":").map((part) => part.padStart(2, "0"));
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  }

  if (timeString.includes(".")) {
    const [hours, minutes] = timeString.split(".").map((part) => part.padStart(2, "0"));
    if (hours === "00") {
      return `00:${minutes.padEnd(2, "0")}`;
    }
    return `${hours.padStart(2, "0")}:${minutes.padEnd(2, "0")}`;
  }

  switch (timeString.length) {
    case 1:
      return `0${timeString}:00`;
    case 2:
      return `${timeString}:00`;
    case 3:
      return `0${timeString.charAt(0)}:${timeString.substring(1)}`;
    case 4:
      return `${timeString.substring(0, 2)}:${timeString.substring(2)}`;
    default:
      throw new Error("Invalid time format");
  }
}
