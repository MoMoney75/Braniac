import './App.css';
import React, {useState, useEffect} from 'react'
import Skeleton from './Routes/Routes';
import GameApi from './APIs/GameApi';
import Logo from './Logo';


function App() {
  const [categories, setCategories] = useState([]);

  /* loads list of possible categories from API, allowing for
      real time available categories for user to choose from */
  useEffect(()=>{
    const getCategories= async() => {
    const result = await GameApi.getCategories();
    console.log("CATEGORY RESULTS:", result)
    setCategories(result.data.trivia_categories);
  }; getCategories()
},[]);

  return (
    <div className='App'>
        <Logo />
       <Skeleton categories={categories}/>
    </div>
  );
}

export default App;
