function convertGoTimeTOJSDate(time: string) {
  let year = parseInt(time?.substring(0, 4));
  let month = parseInt(time?.substring(5, 7)) - 1; // Month is zero-based in JavaScript
  let day = parseInt(time?.substring(8, 10));
  let hour = parseInt(time?.substring(11, 13));
  let minute = parseInt(time?.substring(14, 16));
  let second = parseInt(time?.substring(17, 19));

  let date = new Date(year, month, day, hour, minute, second);
  return date;
}

export function getTimeDifference(time: string) {
  const now = new Date();
  const timeToCompare = convertGoTimeTOJSDate(time);
  const difference = now.getTime() - timeToCompare.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} days ago`;
  }
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  if (seconds > 0) {
    return `${seconds} seconds ago`;
  }
}
