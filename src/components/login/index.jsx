import { useAuth } from '../../context/login-context';
import { userLogin } from '../../api/userLogin';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {

    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    const { email, password, authDispatch } = useAuth();

    async function handleFormSubmission(event) {
        event.preventDefault();
        const data = await userLogin(email, password);
        const authToken = data?.access_token ?? "";

        authDispatch({
            type: "TOKEN",
            payload: {
                token: authToken
            }
        });

        if(authToken) {
            navigate("/");
            localStorage.setItem('email', JSON.stringify(email));
            localStorage.setItem('password', JSON.stringify(password));
            localStorage.setItem('token', JSON.stringify(authToken));
        }
        else {
            setMsg("Invalid Credentials");
            localStorage.removeItem('token');
        }
    }

    const handleEmailIP = (event) => {
        authDispatch({
            type: 'EMAIL',
            payload: {
                email: event.target.value
            }
        });
    }

    const handlePasswordIP = (event) => {
        authDispatch({
            type: "PASSWORD",
            payload: {
                password: event.target.value
            }
        })
    }

    return (
        <form className="login-form" onSubmit={handleFormSubmission} style={{alignItems: "center"}}>
            <div className="d-flex-row flex-sp-btw">
                <span>Email* </span>
                <input type="email" required placeholder="email@example.com" onChange={handleEmailIP}/>
            </div>
            <div className="d-flex-row flex-sp-btw">
                <span>Password* </span>
                <input type="password" required placeholder="********" onChange={handlePasswordIP}/>
            </div>
            <div className="d-flex-row" style={{justifyContent: "center"}}>
                <button>Login</button>
            </div>
            <div style={{color: "red", textAlign: "center"}}>
                {msg}
            </div>
        </form>
    )
}