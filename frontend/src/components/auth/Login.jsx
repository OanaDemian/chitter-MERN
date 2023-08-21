import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../../services/auth.service";
import PropTypes from "prop-types";

export const Login = (props) => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(``);

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };

  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(``);
    setLoading(true);

    const login = await AuthService.login(username, password);
    if (localStorage.getItem("user")) {
      props.updateUserState();
      navigate(`/`);
    } else {
      console.dir(login);
      setMessage(login.error);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div className="form-group">
          <button disabled={loading} type="submit" className="auth-button">
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <button style={{ display: "none" }} />
      </form>
    </div>
  );
};

Login.propTypes = {
  updateUserState: PropTypes.elementType.isRequired,
};
