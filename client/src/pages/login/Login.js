import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import './login.css';
import { login } from '../../context/authContext/apiCalls';
import { AuthContext } from '../../context/authContext/authContext';
import { CircularProgress } from '@material-ui/core';

const Login = () => {
    const { dispatch, isFetching } = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [loginFailed, setLoginFailed] = useState(false)





    let isValidated;
    const formValidator = () => {
        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!email) {
            setEmailErr('Email is required!');
            isValidated = false
        } else if (!email.match(regexEmail)) {
            setEmailErr('Invalid Email Address!');
            isValidated = false
        } else if (!password) {
            setPassErr('Password is required!');
            isValidated = false
        } else if (password.length < 5) {
            setPassErr('Min 5 charecters!');
            isValidated = false
        } else {
            isValidated = true
        }

    }


    const submitHandler = (e) => {
        e.preventDefault();
        formValidator();

        if (isValidated) {
            setEmailErr('');
            setPassErr('');
            login(dispatch, { email, password } , setLoginFailed);
        }
    }


    return (
        <>
            <Helmet>
                <title>Login | Vacation MERN Application</title>
            </Helmet>
            <div className="auth">
                <div className="auth_wrapper">
                    <div className="container">
                        <div className="auth_content text-center">
                            <h3 className="auth_title mb-4">Login</h3>
                            <form action="" className="auth_form" onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        className={emailErr ? 'auth_input is-invalid' : 'auth_input'}
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setLoginFailed(false) }}
                                    />
                                    <p className="invalid-feedback">{emailErr}</p>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        name="email"
                                        className={passErr ? 'auth_input is-invalid' : 'auth_input'}
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setLoginFailed(false) }}
                                    />
                                    <p className="invalid-feedback">{passErr}</p>
                                </div>
                                <button type="submit" className="d-block button primary_btn">
                                    {isFetching ? <CircularProgress className="loading_spin" /> : 'Login'}
                                </button>

                                {loginFailed ? (
                                    <p className="login_failed mt-3 mb-0">Invalid Information Provided!</p>
                                ) : ''}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;