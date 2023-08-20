import PropTypes from "prop-types";
import { Feed } from "../feed/Feed";
import { NewPeep } from "../peep/NewPeep";
export const Home = (props) => {
  return (
    <main>
      {props.currentUser && <NewPeep currentUser={props.currentUser} />}
      <Feed />
    </main>
  );
};

Home.propTypes = {
  currentUser: PropTypes.object,
};
