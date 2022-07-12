import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleClick() {
        navigate("/login");
    };

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        const data = {
            username: name,
            password: password,
        };

        Axios
        .post('http://127.0.0.1:8000/register', data)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="txt_field">
                    <input type="text" className="username" value={name} onChange={(e) => setName(e.target.value)} required />
                    <span></span>
                    <label>username</label>
                </div>
                <div className="txt_field">
                    <input type="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span></span>
                    <label>password</label>
                </div>
                <div style={{ textAlign: "center" }}>
                    <input type="submit" value="SignUp" onClick={handleClick} />
                </div>
            </form>
        </div>
    );
}

export default SignUp;
