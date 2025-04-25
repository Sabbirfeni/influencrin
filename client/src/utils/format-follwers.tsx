export default function formatFollowers(number: number) {
  if (number >= 1_000_000_000) {
    return Math.floor(number / 1_000_000_000) + "B"; // Round down to whole number
  } else if (number >= 1_000_000) {
    return Math.floor(number / 1_000_000) + "M"; // Round down to whole number
  } else if (number >= 1_000) {
    return Math.floor(number / 1_000) + "K"; // Round down to whole number
  } else {
    return number.toString(); // No rounding needed for small numbers
  }
}
