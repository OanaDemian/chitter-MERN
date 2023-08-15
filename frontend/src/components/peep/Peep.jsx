
import PropTypes from 'prop-types';

export const Peep = ({ username, content, dateCreated }) => {

  return (
    <>
      <h5>{username}</h5>
      <h6>{content}</h6>
      <p> - {dateCreated}</p>
    </>
  );
};

Peep.propTypes = {
    product: PropTypes.shape({
        username: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        dateCreated: PropTypes.instanceOf(Date).isRequired
    })
}
