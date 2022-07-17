import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../../App.css'
import './Create.css'

function Create() {
    const params = useParams();
    const id = params.adminId;

    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [correct, setCorrect] = useState("");
    const [quizId, setQuizId] = useState("");
    const [adding, setAdding] = useState(false);
    const navigate = useNavigate();

    function publish(){
        setTimeout(() => {
            navigate('/'+id)
         }, 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setAdding(true);
        if (quizId == "") {
            const ques = { question, option1, option2, option3, option4, correct };
            fetch('http://localhost:9000/create-quiz/' + id, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ques)
            }).then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data.quizCount);
                    console.log(data.quizes[data.quizCount - 1]._id)
                    setQuizId(data.quizes[data.quizCount - 1]._id);
                    setAdding(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        else {
            const ques = { question, option1, option2, option3, option4, correct };
            fetch('http://localhost:9000/add-ques/' + quizId, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ques)
            }).then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data.quizCount);
                    setAdding(false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        
    }
    return (
        <>
            <section class="colored-section">
                <div class="container-fluid">
                    <h1>Create a quiz</h1>
                    
                        <form onSubmit={handleSubmit}>
                        <div class="quiz-form">
                            <div>
                                <div class="form-group">
                                    <label for="InputQuestion">Question</label>
                                    <input type="text" class="form-control" name="question" id="InputQuestion" autoComplete="off" required placeholder="Enter Question"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="InputOption1">Option 1</label>
                                    <input type="text" class="form-control" name="option1" id="InputOption1" autoComplete="off" required placeholder="Enter Option 1"
                                        value={option1}
                                        onChange={(e) => setOption1(e.target.value)}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="InputOption2">Option 2</label>
                                    <input type="text" class="form-control" name="option2" id="InputOption2" autoComplete="off" required placeholder="Enter Option 2"
                                        value={option2}
                                        onChange={(e) => setOption2(e.target.value)}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="InputOption3">Option 3</label>
                                    <input type="text" class="form-control" name="option3" id="InputOption3" autoComplete="off" required placeholder="Enter Option 3"
                                        value={option3}
                                        onChange={(e) => setOption3(e.target.value)}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="InputOption4">Option 4</label>
                                    <input type="text" class="form-control" name="option4" id="InputOption4" autoComplete="off" required placeholder="Enter Option 4"
                                        value={option4}
                                        onChange={(e) => setOption4(e.target.value)}
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="InputCorrectAnswer">Correct Answer</label>
                                    <input type="text" class="form-control" name="correct" id="InputCorrectAnswer" autoComplete="off" required placeholder="Enter Correct Answer"
                                        value={correct}
                                        onChange={(e) => setCorrect(e.target.value)}
                                    />
                                </div>
                            </div>
                            </div>
                            <div>
                                {!adding && <button class="btn btn-outline-light btn-lg add-button" type="submit">Add</button>}
                                {adding && <button class="btn btn-outline-light btn-lg add-button" type="submit" disabled >Adding</button>}
                                <button class="btn btn-outline-light btn-lg add-button" onClick={publish} type="button">Publish</button>
                            </div>
                            
                        </form>
                    </div>
            </section>
        </>
    )
}

export default Create