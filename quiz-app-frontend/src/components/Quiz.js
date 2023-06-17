import React, { useEffect, useState } from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import '../App.css'
import './Quiz.css'

function Quiz() {
    const params = useParams();
    const id = params.quizId;
    useEffect(() => {
        fetchItems();
    }, []);
    const [answerlist, setAnswerlist]= useState([]);
    const [scorelist, setScorelist]= useState([]);
    const [score, setScore] = useState(0);
    const [name, setName] = useState("");
    const [quizes, setQuizes] = useState([]);
    const navigate= useNavigate();
    const fetchItems = async () => {
        console.log(id);
        const data = await fetch('http://localhost:9000/take-quiz/' + id);
        // console.log(data);
        const items = await data.json();
        // console.log(items);
        setQuizes(items.quizes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name === ""){
            alert("Enter name");
            window.location.reload();
        } else {
        const participant = { name, score };
        fetch('http://localhost:9000/submit-quiz/' + id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participant)
        }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data._id);
                setTimeout(() => {
                    navigate('/submit')
                 }, 1)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    function checkanswer(e,ind, op,idx){
        var list=scorelist;
        var answers = answerlist;
        if(answers[ind]){
            answers[ind].style.background='#f9f497';
        }
        answers[ind] = e.target;
        answers[ind].style.color='black'
        answers[ind].style.background='pink'
        op == quizes[idx].quiz[ind].correct ? list[ind]=1: list[ind]=0;
        console.log(list[ind]);
        answers[ind]=e.target;
        setAnswerlist(answers);
        setScorelist(list);
        setScore(scorelist.reduce((a, b) => a + b, 0));
    }

    return (
        <>
        <section class="colored-section">
        <div class="container-fluid">
            <div class="form-group">
                <label for="InputName">Name</label>
                <input type="text" class="form-control" name="name" id="InputName" autoComplete="off" required placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </div>

                {
                    quizes.map((item, idx) => (
                        item._id === id ? (
                            <div>
                                <h1>{item.title}</h1>
                                {
                                    item.quiz.map((i,ind) => (
                                        <div class="ques">
                                            <h3>{i.question}</h3>
                                            <button onClick={(e) => checkanswer(e,ind,i.option1,idx)} type="button" class="btn btn-outline-dark option">{i.option1}</button>
                                            <button onClick={(e) => checkanswer(e,ind,i.option2,idx)} type="button" class="btn btn-outline-dark option">{i.option2}</button>
                                            <button onClick={(e) => checkanswer(e,ind,i.option3,idx)} type="button" class="btn btn-outline-dark option">{i.option3}</button>
                                            <button onClick={(e) => checkanswer(e,ind,i.option4,idx)} type="button" class="btn btn-outline-dark option">{i.option4}</button>
                                            
                                        </div>
                                    ))
                                }
                                <div>
                                    <button type="submit" onClick={handleSubmit} class="btn btn-secondary btn-lg btn-block">Submit</button>
                                </div>
                            </div>
                        ) : (<div>
                        </div>)
                    )
                    )
                }
                </div>
                </section>
            </>
            )
}

            export default Quiz