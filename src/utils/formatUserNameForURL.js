export const formatUserNameForURL = (firstName, lastName) => {
  return `${firstName}-${lastName}`
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9-]/g, ""); // Remove special characters
};
