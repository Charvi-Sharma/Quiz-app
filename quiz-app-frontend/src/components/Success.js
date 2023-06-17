import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import './Success.css'

function Success() {
    const params = useParams();
    const aid = params.adminId;
    const qid = params.quizId;
    const navigate = useNavigate();

    function dashboard(){
        setTimeout(() => {
            navigate('/'+aid)
         }, 1)
    }

    function logout(){
        setTimeout(() => {
            navigate('/')
         }, 1)
    }
    return (
        <>
        <section class="colored-section">
            <div class="container-fluid-home">
            <h1 class="big-heading">Quiz Created Successfully!</h1>
            <div class="content">
            <p>Your quiz has been published with the link: http://localhost:3000/take-quiz/{qid}</p>
            <p>You can view the quiz details on your dashboard.</p>
            </div>
            <div>
                <button class="btn btn-outline-light btn-lg dashboard-button" type="button" onClick={dashboard}>Go To Dashboard</button>
                <button class="btn btn-outline-light btn-lg dashboard-button" type="button" onClick={logout}>Log Out</button>
            </div>
            </div>
            </section>
        </>
    )
}

export default Success;