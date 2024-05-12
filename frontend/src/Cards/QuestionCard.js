import React, {useState, useEffect} from 'react';
import UserAPI from '../APIs/UserAPi';
import './Questions.css'

function QuestionCard({questions, increment, gameOver, setGameOver}){

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [currQuestionIdx, setCurrQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [response, setResponse] = useState('');
    const [questionCounter, setQuestionCounter] = useState(1);
    const [finalMsg, setFinalMsg] = useState('')
    const currQuestion = questions[currQuestionIdx];
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const finalCategory = questions[0].category;

    /* shuffle function used to shuffle the answers shown to a user*/
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
  /* shuffled answers*/
  useEffect(() => {
    if (currQuestion) {
      const answers = [...currQuestion.incorrectAnswers, currQuestion.correctAnswer];
      setShuffledAnswers(shuffleArray(answers));
    }
  }, [currQuestion, currQuestionIdx]);

    /** Retrieve user_id from session for saveGame()*/
    const user_id = +sessionStorage.getItem("user_id")
    
    const handleChange = (e)=>{
        setSelectedAnswer(e.target.value)
    }

    /*Reset all states when game is over*/
    const resetGame = ()=>{
      setCurrQuestionIdx(0)
      setScore(0)
      setQuestionCounter(1)
      setGameOver(true);
      setResponse('')
      setFinalMsg('')
    }

    const handleSubmit =  async (e, currentQuestion) => {
        e.preventDefault();

        if(selectedAnswer === currQuestion.correctAnswer){
            setResponse('correct!')
            setScore(score + increment)
        } else{
          setResponse('incorrect!')
      }

  
      /* handles get next question */
      if (currQuestionIdx + 1 < questions.length) {
        setTimeout(async() =>{
          setCurrQuestionIdx(currQuestionIdx + 1);
          setQuestionCounter(questionCounter + 1);
          setResponse('');
        },1500)
      }

       /** IF final answer is correct, make sure the final score
        * accounts for the final answer being correct
        */
        let finalScore;
        if(selectedAnswer === currQuestion.correctAnswer && currQuestionIdx + 1 >= questions.length){
          finalScore = score+increment;
          setFinalMsg(`Game over! Your final score is ${finalScore}`)
          setTimeout(async()=>{
            await UserAPI.saveGame(user_id, finalScore, finalCategory)
            resetGame();
          },4000)
        }

        /** Saves game if final question is incorrect,
         * score does not need to be incremented
         */
        else if(currQuestionIdx + 1 >= questions.length && selectedAnswer !== currQuestion.correctAnswer) {
          setFinalMsg(`Game over! Your final score is ${score}`)
          setTimeout(async()=>{
            
            await UserAPI.saveGame(user_id, score, finalCategory);
            resetGame();
        },4000)
        }
    };
    
    return (
      <div>
        <div id='mainGameDiv'>
                <p id='question' dangerouslySetInnerHTML={{__html :currQuestion.question}}></p>

                <form onSubmit={(e) => handleSubmit(e, currQuestion)}>
                  {shuffledAnswers.map((answer, idx) => (
                    <div key={idx} className='answers'>
                      <input
                        type='radio'
                        value={answer}
                        id={`answer_${idx}`}
                        checked={selectedAnswer === answer}
                        onChange={handleChange}
                      />
                      <label htmlFor={`answer_${idx}`} dangerouslySetInnerHTML={{__html: answer}}></label>
                    </div>
                  ))}
                  {gameOver === false? 
                  
                  <button className="btn btn-primary" id="answerBtn"type="submit">submit</button>: null}
                  
                </form>
                <p style={{color:response === 'correct!' ? 'green' : 'red'}}>{response}</p>
                <p style={{color: 'green'}}>{finalMsg}</p>

                <div id='counters'>
                <p>score: {score}</p>
                <p>question: {`${questionCounter} / ${questions.length}`}</p>
               </div>
              </div>
            </div>
                  );
                }
    
    export default QuestionCard;
