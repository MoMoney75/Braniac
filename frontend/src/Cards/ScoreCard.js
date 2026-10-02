import React, {useState, useEffect} from 'react';
import './scoreCard.css'
import UserAPI from '../APIs/UserAPi';


/*Shows user high scores  and low scores sorted by categories */
function ScoreCard(){

    const [scores, setScores] = useState([])
    const user_id = sessionStorage.getItem('user_id')

  useEffect(()=>{
    const getScores = async()=>{
      try{
        const result = await UserAPI.getScore(user_id);
        setScores(result.result);
      }
      catch(e){
        console.log("Error while trying to fetch scores:",e);
      }
    }
    getScores();
  }, [user_id])
  console.log(scores);  
return(
    scores.length > 0 ?

        <table className="table">
            <thead>
                <tr>  
                    <th id='rank-header'>Rank</th> 
                    <td style={{color: 'red'}}>Currently unavailable</td>
                </tr>
            
                <tr>
                    <th>Category</th>
                    <th>Score</th>
                </tr>
            </thead>

            <tbody>
                {scores.map((score, idx) => (
                    <tr key={idx}>
                        <td>{score.category}</td>
                        <td>{score.score}</td>
                    </tr>
                ))}
            </tbody>

        </table>


    :

    <div id='emptyDiv'>
        <h2>No saved games found</h2>
        <div style={{height:'100%', margin:"0", display:'flex'}}></div>
    </div>
)}

export default ScoreCard;
