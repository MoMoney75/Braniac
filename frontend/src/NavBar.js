import {useNavigate } from "react-router-dom";
import './Navbar.css';

/* NAVBA is only displayed once a user is logged in*/
function NavBar() {
  const navigate = useNavigate();

  /* Check if user_id exists in sessionStorage */
  const isUserLoggedIn = !!sessionStorage.getItem('user_id');

  /* If user is not logged in, do not render the nav */
  if (!isUserLoggedIn) {
    return null;
  }

  return (
    <nav id="navbar">
      <span>
        <button onClick={()=>{
          navigate('/profile')
        }}className="btn btn-primary" id='profileBtn'>
        Profile
        </button>
      </span>

  <span>
        <button  onClick={()=>{
          navigate('/quiz')
        }}className="btn btn-primary" id='profileBtn'>
          Play
        </button>
      </span>

      <span>
        <button className="btn btn-primary" id='logoutBtn' onClick={() => {
          sessionStorage.removeItem('user_id');
          navigate('/');
        }}>Logout</button>
      </span>
    </nav>
  );
}

export default NavBar;

