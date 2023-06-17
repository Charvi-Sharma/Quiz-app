import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Create from './components/pages/Create';
import Admin from './components/Admin';
import Quiz from './components/Quiz';
import Success from './components/Success';
import Submitted from './components/Submitted';

function App() {
  return (
    <div className="App">
      <Router>
     <Routes>
        <Route path='/create-quiz/:adminId' element={<Create />}/>
        <Route path='/take-quiz/:quizId' element={<Quiz />}/>
        <Route path='/:adminId' element={<Admin />}/>
        <Route path='/success/:adminId/:quizId' element={<Success />}/>
        <Route path='/submit' element={<Submitted />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<Home />}/>
     </Routes>
    </Router>
    </div>
  );
}

export default App;
