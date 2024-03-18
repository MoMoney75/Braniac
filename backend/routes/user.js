const jsonSchema = require('jsonschema')
const express = require('express');
const User = require('../models/user');
const { BadRequestError} = require('../expressErrors/errors')
console.log('__dirname:', __dirname);
const userSchema = require(__dirname + '/../schemas.js/user.json');
const userAuthSchema = require(__dirname + '/../schemas.js/userAuth.json');
const router = express.Router();

/* route handles for user authentication */
router.get("/", async function(req,res,next){
    const {username} = req.body;
    try{
    const user = await User.getUser(username);
    console.log('GETTING USE ON BACKEND:', user);
    return res.json(user)
}

    catch(e){
        console.log("ERROR GETTING USER IN ROUTES:", e)
    }
})


router.post("/register", async function(req,res,next){    
    try{
        const validator = jsonSchema.validate(req.body,userSchema);
        if(!validator.valid){
            throw new Error("UNABLE TO REGISTER IN ROUTES")
        }

        else{
        const {username, password} = req.body
        const user = await User.register(username, password);
        console.log("USER AT REG:", user)
        req.session.user = user;
       return res.status(201).json({success : true, user})
        }

    }
    catch(err){
            console.log(err)
    }});


    router.post('/login', async function(req,res,next){
        try{
            const validator = jsonSchema.validate(req.body, userAuthSchema)
            if(!validator.valid){
                const errors = validator.errors.map(e => e.stack);
                return res.status(400).json({ success: false, user: null, error: errors })
            }

            const {username,password} = req.body;
            const user = await User.authenticate(username,password)
            req.session.user = user;
            console.log('USER ON SERVER SIDE:', user)
            return res.json(user);

    }
        catch(e){
            return next(e)
        }
    })


    router.post('/logout', async function(req,res,next){
        req.session.destroy(function(e){
            if(e){
            console.log(e)
            res.status(500).json({success:false, error: e.message})
            }

            res.json({success : true, message: "successfully logged out"})
        })
    })

    module.exports = router;