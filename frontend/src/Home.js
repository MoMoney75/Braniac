import React from 'react';
import './Home.css'

/** Home page, allows user to login or create new account */
function Home(){
    return(
        <div id='main-div'>
            <h1 className='h1'>Welcome To Brainiac</h1>
                <p>Test your knowledge across a variety of different categories containing hundreds of questions! 
                    Create an account today and get started!
                </p>
        <p>
        <a href='/login' className='btn btn-primary' id='loginBtn'>
            login
        </a>

          <a href='/register' className='btn btn-primary buttons' id='registerBtn'>
            register
          </a>

        </p>
        
        </div>
    )
}

export default Home;