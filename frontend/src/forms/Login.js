import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './reg-login.css'

/** Handles user login, takes username, password
 * adds user_id to session and directs user to quiz settings page
 */
function LoginForm({login}){
const navigate = useNavigate();
const [errors,setErrors] = useState([])
const [formData, setFormData] = useState({
    username: "",
    password: ""
})
function handleChange(e){
    const {name,value} = e.target;
    setFormData(data =>({...data,[name]: value}
    ))}

/* Logs user in, adds user_id to sessionStorage */
async function handleSubmit(e){
        e.preventDefault();
        const result = await login(formData)

        /* Checks for invalid credentials and adds to errors
           if errors occur, displays error to user*/
        if(result.success === true){  
            sessionStorage.setItem('user_id', result.result.user.user_id)
            navigate('/quiz')
            
        }
        else{
        console.log("error received from backend, showing in handesubmit in login form")
            setErrors("Invalid username or password")
            setFormData({
                "username": "" ,
                "password": ""
            })
        }
}

return(
    <div className='main-div'>
        <div className='form-div'>
            <h1> Welcome! </h1>

    {errors.length > 0 && <p style={{ color: 'red' }}>{errors}</p>}
    <form onSubmit={handleSubmit} id='form'>
        <div className='mb-3'> 
        <label htmlFor='username' className='form-label'>Username</label>
        <input type='text'
        name='username'
        value={formData.username}
        onChange={handleChange} 
        className='form-control'/>
        </div>

        <div>
        <label htmlFor='password' className='form-label'> Password </label>
        <input type='password'
        name='password'
        value={formData.password}
        onChange={handleChange} 
        className='form-control form-control-sm'/>
        </div>

            <button type='submit' className='btn btn-primary' id='submitBtn' >Submit</button>
            <a href='/' className= 'btn btn-primary' id='cancelBtn' style={{
                backgroundColor: 'rgb(161, 14, 85)' ,fontSize:'2.5rem',
                marginLeft:'1rem',
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem'}}>Cancel</a>
    </form>

    </div>
    
</div>)};

export default LoginForm;