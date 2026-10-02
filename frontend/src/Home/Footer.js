import './Home.css'
import { useNavigate, Link } from 'react-router-dom';

function Footer(){
    const navigate = useNavigate();
    return(
        <div  className="container-fluid" id='footer'>
            <div className='row'>
            <div className='col'><a> &copy; 2026 Brainiac.com </a></div>
            <div className='col'><a href='https://www.linkedin.com/in/mauricio-silva-dazarola'> Contact </a></div>
            <div className='col'><a href="https://portfolio-2026-7yh0.onrender.com/"> Portfolio </a></div>
            </div>
        </div>
    )
}

export default Footer; 