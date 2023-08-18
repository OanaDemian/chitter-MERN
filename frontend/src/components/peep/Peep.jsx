import PropTypes from "prop-types";
import { formatDate } from '../../utils/date'
import "./peep.css";

export const Peep = ({ peep }) => {
  const date = new Date(peep.dateCreated);
  const prettyDate = formatDate(date)
  
  return (
    <div className="peep-container">
      <div className="peep-details">
        <div className="peep-user-name">
          <p id="peep-name">{peep.firstName}</p>
          <p id="peep-username">@{peep.username}</p>
        </div>
        <div className="peep-timestamp">
          <p id="peep-timestamp">
            {prettyDate}
          </p>
        </div>
      </div>
      <p id="peep-content">{peep.content}</p>
    </div>
  );
};

Peep.propTypes = {
  peep: PropTypes.exact({
    firstName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    dateCreated: PropTypes.instanceOf(Date).isRequired,
  }),
};
