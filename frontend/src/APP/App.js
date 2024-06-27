import './App.css';
import React, {useState, useEffect} from 'react'
import Skeleton from '../Routes/Routes';
import GameApi from '../APIs/GameApi';
import UserAPI from '../APIs/UserAPi';
import Logo from '../Home/Logo';


function App() {
  const INITIAL_STATE = {
    username: '',
    password: '',
}
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [error, setError] = useState("")
  const user_id = sessionStorage.getItem('user_id')

/*Generic handle change function for login and 
  registration forms */
function handleChange(e){
  const {name,value} = e.target;
  setFormData(data =>({...data,[name]: value}
  ))}
  /* Gets saved scores for logged in users */
  // useEffect(()=>{
  //   getLowScores();
  //   getHighScores();
  // },[]);
  
  /* loads list of all possible categories from API, allowing for
      real time available categories for user to choose from */
  useEffect(()=>{
    const getCategories= async() => {
    const result = await GameApi.getCategories();
    setCategories(result.data.trivia_categories);
  }; getCategories()
},[]);

/* Handles retrieving user lowscores and passes down to
     Scorecard.js App.js --> Routes.js --> Scorecard.js */ 
    // const getLowScores = async()=>{
    // try{
    //    const result =  await UserAPI.getLowScore(user_id);
    //    console.log("RESULT IN SCORECARD:", result)
    //    setLowScores(result.result);
    // }
  //   catch(e){
  //     setError("Error retrieving low scores, please try again later")
  //   }
  // }

  /* Handles retrieving user highscores and passes down to
     Scorecard.js App.js --> Routes.js --> Scorecard.js */ 
  // const getHighScores = async()=>{
  //   try{
  //   const result =  await UserAPI.getHighScore(user_id);
  //   setHighScores(result.result);
  // }
  // catch(e){
  // setError("Error retrieving high scores, please try again later")
  // }
  //};



  return (
    <div className='App'>
        <Logo />
       <Skeleton categories={categories} error={error}
       handleChange={handleChange} formData={formData}
       setFormData={setFormData} user_id={user_id}/>
    </div>
  );
}

export default App;
