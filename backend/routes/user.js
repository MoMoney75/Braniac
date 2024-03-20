const jsonSchema = require('jsonschema')
const express = require('express');
const User = require('../models/user');
console.log('__dirname:', __dirname);
const userSchema = require(__dirname + '/../schemas.js/user.json');
const userAuthSchema = require(__dirname + '/../schemas.js/userAuth.json');
const router = express.Router();

/* route handles for user authentication */
router.get("/", async function(req,res,next){
    const {username} = req.body;
    try{
        const user = await User.getUser(username);
        return res.statusCode(200).json({success : true, user})
    }

    catch(err){
        return next(err);
    }
})


router.post("/register", async function(req,res,next){
    const {username, password} = req.body    
    try{
        const user = await User.register(username, password);
        const validator = jsonSchema.validate(req.body,userSchema);

        if(!validator.valid){
            return res.status(400).json({ success: false, user: null, error: errors })
        }
        req.session.user = user;
        return res.status(201).json({success : true, user})
    }
    catch(err){
        return next(err)
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
            console.log (user);
            req.session.user = user;
            return res.status(200).json({success : true, user});

    }
        catch(err){
            return next(err)
        }
    })


    router.post('/logout', async function(req,res,next){
        req.session.destroy(function(e){
            if(e){
            console.log(e)
            res.status(500).json({success:false, error: e.message})
            }

            res.status(200).json({success : true, message: "successfully logged out"})
        })
    })

    module.exports = router;