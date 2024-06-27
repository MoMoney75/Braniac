const express = require('express');
const Game = require('../models/game'); 
console.log('__dirname:', __dirname);
const router = express.Router();

/* Route handler file for getting use high scores,
  lowscores and saving user games to database */

router.post('/save', async function(req,res,next){
    const {user_id,score, category} = req.body;

    try{
        const result = await Game.saveGame(user_id,score,category)
        return res.status(200).json({success: true,result})
        }
        
    catch(err){
        return next(err)
            }
})

router.get('/highscore/:user_id',async function(req,res,next){
    
    try{
    const {user_id} = req.params;  
    const result = await Game.getHighScore(user_id)
    return res.status(200).json({success : true ,result})
    }

    catch(err){
        return next(err)
    }
})

router.get('/lowscore/:user_id', async function(req,res,next){ 
    
    try{
    const {user_id} = req.params;
    const result = await Game.getLowScore(user_id)
    return res.status(200).json({success : true,result})
    }
    catch(err){
        return next(err);
    }
})

module.exports = router;