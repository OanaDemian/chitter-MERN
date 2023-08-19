import { useState } from 'react';
import { newPeep } from '../../services/peeps.service';

export const NewPeep = () => {
    const [content, setContent] = useState(``);
    const onChangeContent = e => {
        const newContent = e.target.value;
        setContent(newContent);
    }
  
   const handleSubmit = async e => {
      e.preventDefault();
     setContent(``);
     const userInfo = JSON.parse(localStorage.getItem('user'));
     await newPeep(content, userInfo.accessToken);
     window.location.reload(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
              <label className="form-label" htmlFor="content"></label>
                <textarea
                  className="form-control"
                  placeholder="Content"
                  id="content"
                  name="content"
                  type="text"
                  rows="3"
                  cols="50"
                  value={content}
                  onChange={onChangeContent}
          ></textarea>
          <br></br>
          <button className="btn btn-primary" id="submit" type="submit">
              <span>Create new peep</span>
          </button>
            </form>
          </div>
    );
};
