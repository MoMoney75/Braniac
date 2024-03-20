const db = require ('../db')

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
             }}


    /* gets user highscores, sorted by categories */
    static async getHighScore(userId){
        const highScore = await 
        db.query
        (`SELECT DISTINCT ON (category) category, scores as maxScore
        FROM user_scores
        WHERE user_id = $1
        ORDER BY category, scores DESC;`, [userId])
                                        
              return highScore.rows
        
    }

    /* gets user low scores, sorted by categories */
    static async getLowScore(user_id){
         const lowscore = await 
         db.query(`SELECT DISTINCT ON (category) category, scores as minScore
         FROM user_scores
         WHERE user_id = $1
         ORDER BY category, scores;`, [user_id])
                                            
            return lowscore.rows
}
}


module.exports = Game;