import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../Home/Home';
import RegistrationForm from '../forms/registration';
import LoginForm from '../forms/Login';
import QuizSettings from '../forms/QuizSettings';
import QuestionCard from '../Cards/QuestionCard';
import ScoreCard from '../Cards/ScoreCard';
import PrivateRoute from './PrivateRoute';

/** MAIN APP SKELETON */
function Skeleton({login,register,categories}){
return(
    <Routes>    
            <Route path='/' element={<Home  />} />

            <Route  path='/register' element={<RegistrationForm 
                                    register={register}/>} /> 

            <Route  path='/login' element={<LoginForm login={login}/>} /> 

            <Route  path='/quiz' element={<PrivateRoute>
                <QuizSettings categories={categories} />
            </PrivateRoute>} />  

            <Route path='/game' element ={
            <PrivateRoute>
                <QuestionCard/>
            </PrivateRoute> } />
            
            <Route path='/profile' element={
            <PrivateRoute> 
                <ScoreCard/>
            </PrivateRoute>} />
    </Routes>)
}

export default Skeleton;