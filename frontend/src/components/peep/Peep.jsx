import PropTypes from "prop-types";
import { formatDate } from "../../utils/date";
import "./peep.css";

export const Peep = ({ peep }) => {
  const date = new Date(peep.date);
  const prettyDate = formatDate(date);
  return (
    <div className="peep-container">
      <div className="peep-details">
        <div className="peep-user-name">
          <p id="peep-name">{peep.name}</p>
          <p id="peep-username">@{peep.username}</p>
        </div>
        <div className="peep-timestamp">
          <p id="peep-timestamp">{prettyDate}</p>
        </div>
      </div>
      <p id="peep-content">{peep.content}</p>
    </div>
  );
};

Peep.propTypes = {
  peep: PropTypes.exact({
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    _id: PropTypes.string,
    __v: PropTypes.number,
  }),
};
