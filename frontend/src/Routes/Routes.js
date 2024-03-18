import React from 'react';
import {Routes, Route, Navigate, Link} from 'react-router-dom';
import Home from '../Home';
import RegistrationForm from '../forms/registration';
import LoginForm from '../forms/Login';
import QuizSettings from '../forms/QuizSettings';
import QuestionCard from '../QuestionCard';
import ScoreCard from '../ScoreCard';
import PrivateRoute from './PrivateRoute';


/** MAIN APP SKELETON */
function Skeleton({categories}){

return(

    <Routes>    

            <Route path='/' element={<Home  />} />

            <Route  path='/register' element={<RegistrationForm />} /> 

            <Route  path='/login' element={<LoginForm />} /> 

            <Route  path='/quiz' element={<PrivateRoute>
                <QuizSettings categories={categories} />
            </PrivateRoute>} />  

            <Route path='/game' element ={
            <PrivateRoute>
                <QuestionCard/>
            </PrivateRoute> } />
            
            <Route path='/profile' element={
            <PrivateRoute> 
                <ScoreCard />
            </PrivateRoute>} />

    </Routes>

)

}

export default Skeleton;