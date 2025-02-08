export function formatDate(date) {
  const pad = (num) => (num < 10 ? `0${num}` : num);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Month is 0-indexed, so add 1
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
