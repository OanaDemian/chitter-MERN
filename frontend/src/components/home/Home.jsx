import PropTypes from "prop-types";
import { Feed } from '../feed/Feed';
import { NewPeep } from '../peep/NewPeep';
export const Home = (props) => {
    return (
      <div>
        {props.currentUser && <NewPeep />}
        <Feed />
        </div>
    );
};

Home.propTypes = {
  currentUser: PropTypes.elementType.isRequired
};

