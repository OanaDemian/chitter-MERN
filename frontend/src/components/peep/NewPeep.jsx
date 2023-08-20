import "./NewPeep.css"
import { useState } from "react";
import { newPeep } from "../../services/peeps.service";
import PropTypes from "prop-types";

export const NewPeep = (props) => {
  const [content, setContent] = useState(``);
  const onChangeContent = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContent(``);
    await newPeep(content, props.currentUser.accessToken);
    window.location.reload(false);
  };

  return (
    <form className="new-peep-form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="content"></label>
      <textarea
        className="new-peep-text"
        placeholder="Content"
        id="content"
        name="content"
        type="text"
        rows="5"
        cols="50"
        value={content}
        onChange={onChangeContent}
      ></textarea>
      <button className="new-peep-button" id="submit" type="submit">
        <span>Create new peep</span>
      </button>
    </form>
  );
};

NewPeep.propTypes = {
  currentUser: PropTypes.object.isRequired,
};
