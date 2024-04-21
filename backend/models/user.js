const db = require('../db')
const bcrypt = require('bcrypt')

/* Handles user authentication: login, register, find user by username */
class User{
    static async getUser(username){
        const result = await db.query(`SELECT user_id, username FROM users
                                        WHERE username = $1`, [username])

        const user = result.rows[0];
        return user;
    }

    static async authenticate(username,password){
            const result = await db.query(`SELECT user_id, username, password FROM users WHERE
            username = $1`, [username])
            const user = result.rows[0];
            
            if(user){
                const isValid = await bcrypt.compare(password, user.password);
            
            if(isValid === true){
                delete user.password;
                return user;
             }
            }
            throw new Error("Invalid username or password")
        }
    static async register(username,password){

            const hashedPassword = await bcrypt.hash(password,12);

            const result = await 
            db.query(`INSERT INTO users(username, password) 
            VALUES ($1, $2) RETURNING username, user_id`,[username,hashedPassword]);
            const user = result.rows[0];

            if (username.length < 8 || password.length < 8) {
                throw new Error("Username and password must be atleast 8 characters long");
            }
             return user;       
    }

}

module.exports = User;