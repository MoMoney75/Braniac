import React from 'react';
import './Home.css'

/** Home page, allows user to login or create new account */
function Home(){
    return(
        <div id='main-div'>
            <h1 className='h1'>Welcome To Brainiac</h1>
                <p>
                    Test your knowledge across a variety of categories containing hundreds of questions! 
                    Create an account today and get started!
                </p>
      
      <div id='buttonDiv'>
        
        <a href="/login">
        <button className='btn btn-primary' id='loginBtn'>
        login
        </button>
        </a>

        <a href="/register">
        <button className='btn btn-primary' id='registerBtn'>
          
            register
        </button>
        </a>
        
    </div>
        
        
        </div>
    )
}

export default Home;