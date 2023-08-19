import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../../services/auth.service';

export const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(``);
    const [surname, setSurname] = useState(``);
    const [username, setUsername] = useState(``);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState(``);

    const onChangeFirstName = e => {
        const firstName = e.target.value;
        setFirstName(firstName);
        };
    
    const onChangeSurname = e => {
        const surname = e.target.value;
        setSurname(surname);
    };
    const onChangeUsername = e => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = e => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = e => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = async e => {
        e.preventDefault();

        setMessage(``);
        setSuccessful(false);

        const register = await AuthService.register(firstName, surname, username, email, password);
        if (register.message) {
            setMessage(register.message);
            setSuccessful(true);
            navigate(`/login`);
        }
        else {
            setMessage(register.error);
            setSuccessful(false);
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <form onSubmit={handleRegister} >
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={onChangeFirstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Surname</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="surname"
                                    value={surname}
                                    onChange={onChangeSurname}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}
                    {message && (
                        <div className="form-group">
                            <div className={successful ? `alert alert-success` : `alert alert-danger`} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <button style={{ display: "none" }} />
                </form>
            </div>
        </div>
    );
};
