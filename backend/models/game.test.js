const db = require('../db');
const Game = require('./game')
const User = require('./user')

const { describe } = require('node:test');
const {commonBeforeAll, commonBeforeEach, 
      commonAfterAll, commonAfterEach} 
      = require('./_testCommon');


beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("Test game based routes", function(){
    test("Successfull game save", async function(){
        const user = await User.getUser("TestUser1")
        const newGame = await Game.saveGame(user.user_id,10,"test")
        expect(newGame).toEqual(
        {
            "category":"test", 
            "scores": 10, 
            "user_id": newGame.user_id
        });
    })

    test("Get user highscores", async function(){
        const user = await User.getUser("TestUser1")
        await Game.saveGame(user.user_id,'10','science')
        const result = await Game.getHighScore(user.user_id)
        expect(result).toEqual([{"maxscore": 10, "category": "science"}])
    })

    test("Get user lowscores", async function(){
        const user = await User.getUser("TestUser1")
        await Game.saveGame(user.user_id,'1','science')
        const result = await Game.getLowScore(user.user_id)
        expect(result).toEqual([{"minscore": 1, "category": "science"}])
    })
})
