import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Success.css'

function Submitted() {
    const navigate = useNavigate();

    function goToHome(){
        setTimeout(() => {
            navigate('/')
         }, 1)
    }
    return (
        <>
        <section class="colored-section">
            <div class="container-fluid-home">
            <h1 class="big-heading">Quiz Submitted Successfully!</h1>
            <div class="content">
            <p>Your quiz has been submitted.</p>
            <p>Register to create your own quiz!</p>
            </div>
            <div>
                <button class="btn btn-outline-light btn-lg dashboard-button" type="button" onClick={goToHome}>Register</button>
            </div>
            </div>
            </section>
        </>
    )
}

export default Submitted;