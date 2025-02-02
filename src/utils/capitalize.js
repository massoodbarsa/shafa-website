export const capitalizeFirstLetter = (string) => {
  if (!string) return string; // Handle empty or undefined input
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
