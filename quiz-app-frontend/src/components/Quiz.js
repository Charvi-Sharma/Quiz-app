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

    const [index, setIndex] = useState(0);
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
        const participant = { name, score };
        // setPending(true);
        fetch('http://localhost:9000/submit-quiz/' + id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(participant)
        }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data._id);
                // setPending(false);
                setTimeout(() => {
                    navigate('/')
                 }, 1)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function wrongAnswer(e) {
        console.log("incorrect");
        // setIndex(index + 1);
    }
    function rightAnswer(e) {
        console.log("correct");
        setScore(score + 1)
        // setIndex(index + 1);
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
                {/* <h1>Questions</h1>
                <label>Name</label>
                <input type="text" name="question" autoComplete="off" required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /> */}

                {
                    quizes.map((item) => (
                        item._id === id ? (
                            <div>
                                {
                                    item.quiz.map((i) => (
                                        <div class="ques">
                                            <h3>{i.question}</h3>
                                            <button onClick={i.option1 == i.correct ? rightAnswer : wrongAnswer} type="button" class="btn btn-outline-dark option">{i.option1}</button>
                                            <button onClick={i.option2 == i.correct ? rightAnswer : wrongAnswer} type="button" class="btn btn-outline-dark option">{i.option2}</button>
                                            <button onClick={i.option3 == i.correct ? rightAnswer : wrongAnswer} type="button" class="btn btn-outline-dark option">{i.option3}</button>
                                            <button onClick={i.option4 == i.correct ? rightAnswer : wrongAnswer} type="button" class="btn btn-outline-dark option">{i.option4}</button>
                                            
                                        </div>
                                    ))
                                }
                                {/* <p>{item.quiz[index].question}</p>
                            <button onClick={item.quiz[index].option1 == item.quiz[index].correct ? rightAnswer : wrongAnswer}>{item.quiz[index].option1}</button>
                            <button onClick={item.quiz[index].option2 == item.quiz[index].correct ? rightAnswer : wrongAnswer}>{item.quiz[index].option2}</button>
                            <button onClick={item.quiz[index].option3 == item.quiz[index].correct ? rightAnswer : wrongAnswer}>{item.quiz[index].option3}</button>
                            <button onClick={item.quiz[index].option4 == item.quiz[index].correct ? rightAnswer : wrongAnswer}>{item.quiz[index].option4}</button> */}
                                <div>
                                    <button onClick={handleSubmit} class="btn btn-secondary btn-lg btn-block">Submit</button>
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