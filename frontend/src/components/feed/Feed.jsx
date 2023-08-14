import PropTypes from 'prop-types';
import { Peep } from '../peep/peep';
export const Feed = props => {
  const { peeps } = props;
console.log(peeps)
    let peepsArray = []

  peeps.forEach(peep => {
    peepsArray.push(< Peep username={peep.username} content={peep.content} key={peep._id} />)
  });

return (
  <section>
    
          {peeps.map(peep =>
            <Peep username={peep.username} content={peep.content} key={peep._id} />
          )}

      </section>
    );
};
Feed.propTypes = {
  peep: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    dateCreated: PropTypes.instanceOf(Date).isRequired
  })
}