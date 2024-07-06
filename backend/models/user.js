const db = require('../db')
const bcrypt = require('bcrypt')
const  {
    BadRequestError,
  } = require("../expressErrors/errors")

/* User class handles basic user get/post menthods */
/* Handles user authentication: login, register, find user by username */
class User{

    static async getUser(username){
        const result = await db.query(`SELECT username FROM users
                                        WHERE username = $1`, [username])

        const user = result.rows[0];
        return user;
    }

    static async authenticate(username,password){
            const result = await db.query(`SELECT user_id, username, password FROM users WHERE
            username = $1`, [username])
            const user = result.rows[0];
            if(user.length === 0){
                throw new BadRequestError("Invalid username or password")
            }

            if(user){
                const isValid = await bcrypt.compare(password, user.password);
            
            if(isValid === true){
                delete user.password;
                return user;
             }
            }

            /* error handling for incorrect username/password */
            
        }

    static async register(username,password){

        const duplicateUser = await db.query(`SELECT username FROM
        users WHERE username = $1`,[username])

        if(duplicateUser.rows[0]){
            throw new BadRequestError("Username already exists, Please login or try a different username");
        }

        const hashedPassword = await bcrypt.hash(password,12);
        
        const result = await 
            db.query(`INSERT INTO users(username, password) 
            VALUES ($1, $2) RETURNING username, user_id`,[username,hashedPassword]);
           ;

            const user = result.rows[0]
             return user;       
    }

}

module.exports = User;