import React, {useState, useEffect} from 'react';
import './scoreCard.css'
import UserAPI from '../APIs/UserAPi';


/*Shows user high scores  and low scores sorted by categories */
function ScoreCard(){
    const [lowScore, setLowScore] = useState([])
    const [highScores, setHighScores] = useState([])

    useEffect(()=>{
        const getLowScore = async()=>{
        try{
        const user_id = sessionStorage.getItem('user_id')
           const result =  await UserAPI.getLowScore(user_id);
           console.log("RESULT IN SCORECARD:", result)
           setLowScore(result.result);
        }
        catch(e){
            console.log(e);
        }
    };
    getLowScore();
  }, [])


  useEffect(()=>{
    const getHighScores = async()=>{
    try{
        const user_id = sessionStorage.getItem('user_id')
        const result =  await UserAPI.getHighScore(user_id);
        setHighScores(result.result);
    }
    catch(e){
        console.log(e);
    }
};
getHighScores();
}, [])


return(
    lowScore.length > 0  && highScores.length > 0?
 <div id='mainScoreDiv'>
    <div className='scoreCardDiv'>
        <div className='scoreCard'>
            <p className='h2' id='highScore'>High Scores</p>
                <ul>
                    {highScores.map((score,idx)=>(
                        <li key={idx}>
                            <p dangerouslySetInnerHTML = {{__html: score.category + ':' +' ' +  score.maxscore}}></p>

                        </li>
                        ))}
                </ul>
            </div>
        </div>

    <div className='scoreCardDiv'>
        <div className='scoreCard'>
            <p className='h2' id='lowScore'>Low Scores</p>
                <ul>
                    {lowScore.map((score,idx)=>(
                        <li key={idx}>
                             <p dangerouslySetInnerHTML = {{__html: score.category + ':' +' ' +  score.minscore}}></p>
                        </li>
                        ))}
                </ul>
        </div>
    </div>
</div> :  
<div id='emptyDiv'>
<h2>no saved games</h2>
<div style={{height:'100%', margin:"0", display:'flex'}}></div>
</div>
)
                    
}

export default ScoreCard;