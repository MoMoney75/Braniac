import React from 'react';
import './Home.css'

/** Home page, allows user to login or create new account */
function Home(){
    return(
            <div className='main-div'>
        <div  className="container" id='home-div'>
            <h1 id="welcome-h1">Welcome to Brainiac</h1>
                <p>Genious? Prove it.</p>
      
        <div className='buttonDiv'>
            <a href="/login">
                <button className='btn-lg' id='loginBtn'> Login </button>
            </a>
            
            <a href="/register">
                <button className='btn-lg' id='registerBtn'> Register </button>
            </a>
        </div>
        </div>
    </div>)}

export default Home;