const db = require ('../db')
const { BadRequestError } = require('../expressErrors/errors')
class Game{
    
    /* Upon game completion, game results are added to user_scores */
    static async saveGame(user_id, score, category){
            const userRes = await db.query(`SELECT user_id FROM users WHERE user_id = $1`, [user_id])
            const userId = userRes.rows[0].user_id

            if(userId){
                const result = await 
                    db.query(`INSERT INTO user_scores(user_id,scores,category)
                              VALUES($1, $2, $3) RETURNING user_id, scores, category`,[userId,score,category])
                                            
                return result.rows[0];
             }
            else{
                throw new BadRequestError("Error while attempting to save game")
            }}


    /* Gets user highscores by user id, sorted by categories */
    static async getHighScore(user_id){
        if(!user_id){
            throw new BadRequestError("User not found, unable to get user scores")
        }

        const highScore = await 
        db.query
        (`SELECT DISTINCT ON (category) category, scores as maxScore
        FROM user_scores
        WHERE user_id = $1
        ORDER BY category, scores DESC;`, [user_id])
                                 
              return highScore.rows
        
    }

    /* Gets user low scores, sorted by categories */
    static async getLowScore(user_id){
        if(!user_id){
            throw new BadRequestError("User not found, unable to get scores")
        }
         const lowscore = await 
         db.query(`SELECT DISTINCT ON (category) category, scores as minScore
         FROM user_scores
         WHERE user_id = $1
         ORDER BY category, scores;`, [user_id])
                                            
            return lowscore.rows;
}
}


module.exports = Game;