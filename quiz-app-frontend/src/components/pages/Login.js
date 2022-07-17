import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const admin = { name , password};
        fetch('http://localhost:9000/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(admin)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data._id);
                setTimeout(() => {
                    navigate('/'+data._id)
                 }, 1)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>

            <section class="colored-section">
                <div class="container-fluid-home">
                    <div class="row">
                        <div class="col-lg-6">
                            <h1 class="big-heading">Take fun quizes or create one of your own.</h1>
                        </div>

                        <div class="col-lg-6">
                            <div class="register-form">
                                <h1>Sign In</h1>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div class="form-group">
                                            <label for="InputEmail">Email address</label>
                                            <input type="email" class="form-control" id="InputEmail" autoComplete="off" required placeholder="Enter email" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label for="InputPassword">Password</label>
                                            <input type="password" class="form-control" id="InputPassword" autoComplete="off" required placeholder="Enter Password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn btn-outline-light btn-lg signup-button" type="submit">Log In</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Login