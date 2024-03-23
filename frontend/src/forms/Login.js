import React, {useState} from 'react'
import UserAPI from '../APIs/UserAPi';
import { useNavigate } from 'react-router-dom';
require('./reg-login.css')

/** Handles user login, takes username, password
 * adds user_id to session and directs user to quiz settings page
 */
function LoginForm(){
const navigate = useNavigate();
const INITIAL_STATE = {
    username: '',
    password: '',
}
const [formData, setFormData] = useState(INITIAL_STATE);
const [errors,setErrors] = useState([])
    
function handleChange(e){
const {name,value} = e.target;
setFormData(data =>({...data,[name]: value}
    ))}


/*Logs user in, adds user_id to sessionStorage */
async function handleSubmit(e){
        e.preventDefault();
        const result = await UserAPI.login(formData);
        /* checks for invalid credentials */
        if(!result){
            setErrors("Invalid username or password")
            setFormData(INITIAL_STATE)
        }
        
        else{
        sessionStorage.setItem('user_id', result.user.user_id)
        navigate('/quiz')
        setFormData(INITIAL_STATE);
        }

}

return(
    <div className='main-div'>
        <div className='form-div'>
            <h1 className='h3'> login  </h1>
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
            <a href='/' className= 'btn btn-primary' id='cancelBtn' style={{
                backgroundColor: 'rgb(161, 14, 85)' ,fontSize:'2.5rem',
                marginLeft:'1rem',
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem'}}>cancel</a>
    </form>

    {errors.length > 0 && <p style={{ color: 'red' }}>{errors}</p>}
    </div>
    
</div>)};

export default LoginForm;