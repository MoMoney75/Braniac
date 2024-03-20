import React, {useState} from 'react'
import UserAPI from '../APIs/UserAPi';
import { useNavigate } from 'react-router-dom';
import('./reg-login.css')

/** Handles user registration(username,password(for now))
 * if successfull, adds user_id to session and directs to
 * quiz settings page
*/
function RegistrationForm(){
const INITIAL_STATE = {
    username: '',
    password: '',
}
const navigate = useNavigate();
const [formData, setFormData] = useState(INITIAL_STATE);
const [error, setError] = useState(null);
    
function handleChange(e){
const {name,value} = e.target;
setFormData(data =>({...data,[name]: value}
    ))}


async function handleSubmit(e){
    e.preventDefault();
    const result = await UserAPI.register(formData);
        if(!result){
           setError("Username and password must be 8-25 characters long")
        }
       
        else{
        const user_id = result.user.user_id;
        sessionStorage.setItem("user_id", user_id);
        navigate('/quiz');
        setFormData(INITIAL_STATE);
        }
}

return(
    <div className='main-div'>
        <div className='form-div'>
        <h1 className='h3'>
            Create an account  
        </h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}
     
        <form onSubmit={handleSubmit} id='form'>
       
            <div className='mb-3'> 
            <label htmlFor='username' className='form-label'> username </label>
            <input type='text'
            name='username'
            value={formData.username}
            onChange={handleChange} 
            className='form-control'/>
            </div>

            <div>
            <label htmlFor='password' className='form-label'> password </label>
            <input type='password'
            name='password'
            value={formData.password}
            onChange={handleChange} 
            className='form-control form-control-sm'/>
            </div>

                <button type='submit' className='btn btn-primary' id='submitBtn' >submit</button>
                <a href='/' className='btn btn-primary' id='cancelBtn' style={{ backgroundColor: 'rgb(161, 14, 85)' ,marginLeft:'1rem'}}>cancel</a>
        </form>

        </div>
        
    </div>
)
}

export default RegistrationForm;