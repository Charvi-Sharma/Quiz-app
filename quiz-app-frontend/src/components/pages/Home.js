import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import './Home.css'

function Home() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    function validate(e) {
        setPass(e.target.value);
        if(e.target.value.length < 6){
            document.getElementById("message").innerHTML="Password must be atleast 6 characters long";
        }
        else{
            document.getElementById("message").innerHTML="Password accepted";
            setPassword(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === "") {
            alert("Invalid password");
            window.location.reload();
        }
        else{
        const admin = { name , password};
        fetch('http://localhost:9000/create-admin', {
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
                                <h1>Register Here !</h1>
                                <form onSubmit={handleSubmit}>
                                    <div class="fields">
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
                                            value={pass}
                                            onChange={validate}
                                            />
                                            <div id="message"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <button class="btn btn-outline-light btn-lg signup-button" type="submit">Sign Up</button>
                                        <br />
                                        <Link to={"/login"} style={{ color:'white'}}>Already have an account? Log In</Link>
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

export default Home