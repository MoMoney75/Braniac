const db = require('../db');
const User = require('./user')

const { describe } = require('node:test');
const {commonBeforeAll, commonBeforeEach, 
      commonAfterAll, commonAfterEach} 
      = require('./_testCommon');


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Tests user authentication", function(){
    test("Successful user login", async function(){
        const user = await User.authenticate("TestUser1", "Password1");
        console.log("USER RESULTS IN TEST:", user)
        expect(user).toEqual({
            username : "TestUser1",
            user_id : user.user_id
        });
    })

    test("Fails login with wrong credentials", async function(){
        try{
        await User.authenticate("TestUser1", "wrongPassword")
        }
        catch(e){
            expect(e.message).toEqual("Invalid username or password")
        }
    })
})

describe("Test new user registration", function(){
    test("Successful new user registration", async function(){
        const newUser = await User.register("newUser1", "newUserPassword1")
        expect(newUser).toEqual({"username" :"newUser1"})
    })

    test("Invalid user registration", async function(){
        try{
        await User.register("1", "2")
        }
        catch(e){
        expect(e.message).toEqual("Username and password must be atleast 8 characters long")
        }
    })
})