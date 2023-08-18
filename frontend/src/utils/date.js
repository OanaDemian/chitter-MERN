export const formatDate = (date) => {
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const day = date.getDate();
  const month = monthToString(date);

  return hour < 12
    ? `${hour}:${minutes} AM · ${month} ${day}, ${year} `
    : `${hour}:${minutes} PM · ${month} ${day}, ${year} `
}

const monthToString = (date) => {
  switch (date.getMonth()) {
    case 0:
      return "January";
    case 1:
     return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return"May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return ""
  }
}