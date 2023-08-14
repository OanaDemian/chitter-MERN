
import PropTypes from 'prop-types';

export const Peep = ({ username, content, dateCreated }) => {

  return (
    <>
      <h5>{username}</h5>
      <div className="card-body">
          {content}
          <p>
            - {username}
        </p>
        </div>
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
