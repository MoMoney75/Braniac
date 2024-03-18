import './Quiz.css'
import React, {useState} from "react";
import GameApi from "../APIs/GameApi";
import QuestionCard from "../QuestionCard";



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
const [error, setErrors] = useState([]);
const [gameOver, setGameOver] = useState(true)

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

        <form id='settingsForm' onSubmit={handleSubmit} style={{ display: gameOver === false ? 'none' : null}}>
    <div>
        <label htmlFor="amount" className="form-label settingsLabel">Number of questions</label>
        <select
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        >
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

        <div>
        <label htmlFor="difficulty" className="form-label settingsLabel">Difficulty</label>
        <select className='form-select'
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        </div>

       <div>
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

        <div>

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
