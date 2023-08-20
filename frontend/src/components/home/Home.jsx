import PropTypes from "prop-types";
import { Feed } from "../feed/Feed";
import { NewPeep } from "../peep/NewPeep";
export const Home = (props) => {
  return (
    <div>
      {props.currentUser && <NewPeep currentUser={props.currentUser} />}
      <Feed />
    </div>
  );
};

Home.propTypes = {
  currentUser: PropTypes.object,
};
