const bcrypt = require("bcrypt");
const db = require("../db.js");

async function commonBeforeAll(){
    //delete all rows from users
    await db.query('DELETE FROM user_scores')
    await db.query('DELETE FROM users')
    

    //hash test passwords
    const hashedPasswords = await Promise.all([
        bcrypt.hash('Password1', 12),
        bcrypt.hash('Password2', 12),
        bcrypt.hash('Password3', 12)
    ]);
    //insert test users for testing purposes
    await db.query(`INSERT INTO users(username,password) 
                    VALUES ($1, $2), ($3,$4), ($5,$6)
                            RETURNING username`,[
                                'TestUser1', hashedPasswords[0],
                                'TestUser2', hashedPasswords[1],
                                'TestUser3', hashedPasswords[2]
                            ]);


   await db.query(`INSERT INTO user_scores(scores,category) 
                   VALUES ('1', 'science'),
                          ('2', 'sports'),
                          ('3', 'television') RETURNING scores,category`);

}

async function commonBeforeEach() {
    await db.query("BEGIN");
  }
  
  async function commonAfterEach() {
    await db.query("ROLLBACK");
  }
  
  async function commonAfterAll() {
    await db.end();
  }
   
module.exports = {
 commonBeforeAll,
 commonBeforeEach,
 commonAfterAll,
 commonAfterEach
}