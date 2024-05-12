import './Quiz.css'
import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import GameApi from "../APIs/GameApi";
import QuestionCard from "../Cards/QuestionCard";



/* Handles user form input for setting up each
   individual game, take user to /quiz upon submission */

function QuizSettings({categories}){
const INITIAL_STATE ={
    "amount" : '10',
    "difficulty" : 'easy',
    "category" : '9',
    "type" : 'boolean'
}

const [formData, setFormData] = useState(INITIAL_STATE);
const [questions, setQuestions] = useState([])
const [increment, setIncrement] = useState(1)
const [error, setError] = useState([]);
const [gameOver, setGameOver] = useState(true)
const navigate = useNavigate();

const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData(data => ({...data,[name]: value}))
}

const handleSubmit = async (e) =>{

        e.preventDefault();
        setGameOver(false);

        const result = await GameApi.getQuestions(
        formData.amount,
        formData.type,
        formData.difficulty,
        formData.category
        );
          if(result.length === 0){
            setError("Sorry! not enough questions in this category to fulfill your request at this time! Please try again")
            navigate('/quiz')

          }
          console.log("RESULT IN FRONTEND:",result)

        /* handles scoring system based on user difficulty choice */
        if(formData.difficulty === 'medium'){
          setIncrement(3)
        }

        if(formData.difficulty === 'hard'){
          setIncrement(5)
        }
        setQuestions(result)
        setFormData(INITIAL_STATE);
       

}


return (

    <div id='settingsFormDiv'>


    {error.length > 0 && (
      <p style={{ color: 'red' }}>
        {error} <button className='btn' onClick={() => window.location.reload()}>refresh</button>
      </p>
    )}

        <form id='settingsForm' onSubmit={handleSubmit} 
        style={{ display: gameOver === false ? 'none' : null}}>

    <div className='inputDiv'>
        <label htmlFor="amount" className="form-label settingsLabel">Number of questions</label>
        <div className='selectDiv'>
        <select
          name="amount"
          value={formData.amount}
          onChange={handleChange}>

          <option value={10}>
          10
          </option>

          <option value={15}>
          15
          </option>

          <option value={20}>
          20
          </option>


          <option value={25}>
          25
          </option>
     
        </select>
        </div>
      </div>

        <div className='inputDiv'>

          <label htmlFor="difficulty" className="form-label settingsLabel">
            Difficulty
          </label>

        <select className='form-select'
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}>

            <option value="easy">Easy (1pt)</option>
            <option value="medium">Medium (3pts)</option>
            <option value="hard">Hard (5pts)</option> 

        </select>
        </div>

       <div className='inputDiv'>
        <label htmlFor="category" className="form-label settingsLabel">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
           {categories.map((category,idx) => (
            <option  key={idx} value={category.id}>{category.name}</option>
           ))}
        </select>
        </div>

        <div className='inputDiv'>

        <label htmlFor="type" className="form-label settingsLabel">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >

            <option value="boolean">True/False</option>
            <option value="multiple">Multiple Choice</option>
            <option value='null'>Any</option>
          
        </select>
      </div>
        <button className="btn btn-primary" id='settingsSubmitBtn'>submit</button>
        </form>  

        {!gameOver && questions.length > 0 ? <QuestionCard  questions={questions} increment={increment} gameOver={gameOver} setGameOver={setGameOver}/> : null }
    </div>


           
)
}

export default QuizSettings;
