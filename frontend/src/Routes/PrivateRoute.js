
import React, {useNavigate } from "react-router-dom";

/* Handles user must be logged in to visit anything other
than login/register */
function PrivateRoute({path='/',children}){
const navigate = useNavigate();
const user = sessionStorage.getItem('user_id')

if(!user){
    navigate('/')
}

return(
    children
)
}

export default PrivateRoute