import './App.css';
import React, {useState, useEffect} from 'react'
import Skeleton from '../Routes/Routes';
import GameApi from '../APIs/GameApi';
import UserAPI from '../APIs/UserAPi';
import Logo from '../Home/Logo';


function App() {
  const [categories, setCategories] = useState([]);
  const user_id = sessionStorage.getItem("user_id")

async function register(signUpData){
  try{
    const result = await UserAPI.register(signUpData)
    return ({success: true, result})
  }
 catch(err){
  return ({success: false, err: err})
 }
} 

async function login(loginData){
  try{
    const result = await UserAPI.login (loginData)
    return ({success: true, result})
  }

  catch(err){
    return ({success: false, err:err})
  }
}
  
  /* loads list of all possible categories from API, allowing for
      real time available categories for user to choose from */
  useEffect(()=>{
    const getCategories= async() => {
    const result = await GameApi.getCategories();
    setCategories(result.data.trivia_categories);
  }; getCategories()
},[]);

  return (
    <div className='App'>
        <Logo />
       <Skeleton login={login} register={register}categories={categories}
       user_id={user_id}/>
    </div>
  );
}

export default App;
