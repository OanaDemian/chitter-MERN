
import PropTypes from 'prop-types';

export const Peep = ({ user, username, content, dateCreated}) => {
  const date = new Date(dateCreated);
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const day = date.getDate();
  let month;
switch (new Date().getMonth()) {
  case 0:
    month = "January";
    break;
  case 1:
    month = "February";
    break;
  case 2:
    month = "March";
    break;
  case 3:
    month = "April";
    break;
  case 4:
    month = "May";
    break;
  case 5:
    month = "June";
    break;
  case  6:
    month = "July";
  case 7:
    month = "August";
    break;
  case 8:
    month = "September";
    break;
  case 9:
    month = "October";
    break;
  case 10:
    month = "November";
    break;
  case 11:
    month = "December";
    break;
}
  return (
    <>
      <p>{user}</p>
      <p>@{username}</p>
      <p>{content}</p>
      <p> - {(hour<12)? `${hour}:${minutes} AM · ${month} ${day}, ${year} `:`${hour}:${minutes} PM · ${month} ${day}, ${year} `}</p>
    </>
  );
};

Peep.propTypes = {
  product: PropTypes.shape({
        user: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        dateCreated: PropTypes.instanceOf(Date).isRequired
    })
}
