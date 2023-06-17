import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import './Admin.css'

function Admin() {
  const params = useParams();
  const id = params.adminId;
  useEffect(() => {
    fetchItems();
  }, []);

  const [quizes, setQuizes] = useState([]);
  const fetchItems = async () => {
    console.log(id);
    const data = await fetch('http://localhost:9000/' + id);
    console.log(data);
    const items = await data.json();
    console.log(items);
    setQuizes(items.quizes);
  };
  return (
    <>
      <section class="colored-section-admin">
        <div class="container-fluid">
        <h1>Quiz Dashboard</h1>
          <div class="content">This is the place where you can view all the quizes you have created and share them with your friends, students and colleagues. Just copy the link and send it to them to see how they do !</div>
          <Link to={"/create-quiz/" + id}  style={{ color:'white', fontSize:'1.5rem'}}>Create a Quiz</Link>
          <section id="quiz">
            <div id="quiz-carousel" class="carousel slide container-fluid" data-ride="false">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <h2>View Quizes</h2>
                </div>
                {
                  quizes.map(item => (
                    <div class="carousel-item">
                      <p>Quiz: {item.title}</p>
                      <p>Share Link: http://localhost:3000/take-quiz/{item._id}</p>
                      <p>Quiz Results</p>
                      {
                        item.scores.map((participant) =>(
                          <>
                          <p>{participant.name} : {participant.score}</p>
                          </>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#quiz-carousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#quiz-carousel" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default Admin