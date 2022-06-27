import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();
export const setCookie = (name, value, option) => {
    return cookies.set(name, value, { ...option });
}
export const getCookie = (name) => {
    return cookies.get(name);
}

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    function handleClick() {
        navigate("/signup");
    };

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        const data = {
            username: name,
            password: password,
        };

        const news = async () => {
            let res = await Axios
            .post('http://127.0.0.1:8000/login',
            data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then((res) => {
                setCookie('token', res.data.access_token);
                return res;
            })
            .catch((error) => {
                console.log(error);
            });
            navigate('/upload');
            return res;
        };

        let x = await news();
        if (x) {
            window.location.reload();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="txt_field">
                    <input type="text" className="user_id" value={name} onChange={(e) => setName(e.target.value)} required />
                    <label>username</label>
                </div>
                <div className="txt_field">
                    <input type="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label>password</label>
                </div>
                <div className="signup_link">
                    Not a member? <a href="#/" onClick={handleClick}>SignUp</a>
                </div>
                <div style={{ textAlign: "center" }}>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default Login;
