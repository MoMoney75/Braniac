import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './reg-login.css'
/** Handles user registration(username,password(for now))
 * if successfull, adds user_id to session and directs to
 * quiz settings page
*/
function RegistrationForm({register,handleChange}){

const navigate = useNavigate();
const [errors, setError] = useState([]);
const [formData,setFormData] = useState({
    username: "",
    password: ""
})

function handleChange(e){
    const {name,value} = e.target;
    setFormData(data =>({...data,[name]: value}
    ))}
    
async function handleSubmit(e){
        e.preventDefault();
        let result = await register(formData)

        if(result.success === true){
        sessionStorage.setItem('user_id', result.result.user.user_id)
        navigate('/quiz')
        setFormData({
            username: "",
            password: ""})
        }
        else if(result.success === false){
            setError(result.err)}
        }      
        
return(
    <div className='main-div'>
        <div className='form-div'>
        <h1 className='h5'>
            Register Now! 
        </h1>
        {errors.length ? errors.map(e => <p style={{color: 'red'}}>{e}</p>) : null}
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
                <a href='/' className='btn btn-primary' id='cancelBtn' style={{ 
                backgroundColor: 'rgb(161, 14, 85)' ,fontSize:'2.5rem',
                marginLeft:'1rem',
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem'}}>cancel</a>
        </form>

        </div>
        
    </div>
)
}

export default RegistrationForm;