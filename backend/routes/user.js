const jsonSchema = require('jsonschema')
const express = require('express');
const User = require('../models/user');
const { BadRequestError } = require('../expressErrors/errors');
const userSchema = require(__dirname + '/../schemas.js/user.json');
const userAuthSchema = require(__dirname + '/../schemas.js/userAuth.json');
const router = express.Router();

/* Route handler for user authentication */
/* Find users by username (feature has not yet been added) */
router.get("/", async function(req,res,next){
    const {username} = req.body;
    try{
        const user = await User.getUser(username);
        return res.statusCode(200).json({success : true, user})
    }
    catch(err){
        console.log("ERROR GETTING USERS IN ROUTES:", err)
        return next(err);
    }
})


/* Route handler for new user registration */
router.post("/register", async function(req,res,next){
    try{
        const validator = jsonSchema.validate(req.body,userSchema);
        if(!validator.valid){
        const errors = validator.errors.map(e => e.stack);
        throw new BadRequestError(errors)
        }
        const {username, password} = req.body ;

        const user = await User.register(username, password);
        /* After successfull user registration, logs user in and adds
           to current session */
        req.session.user = user.user_id;
        return res.status(201).json({success : true, user})
    }
    catch(err){
        console.log("ERROR /REGISTER IN ROUTES:", err)
        return next(err)
    }});

    /* Route handler for user login */
    router.post('/login', async function(req,res,next){
        try{
            const validator = jsonSchema.validate(req.body, userAuthSchema)
            if(!validator.valid){
                const errors = validator.errors.map(e => e.stack);
                throw new BadRequestError(errors)
            }

            const {username,password} = req.body;
            const user = await User.authenticate(username,password)
            req.session.user = user.user_id;
            return res.status(200).json({success : true, user});

    }
        catch(err){
            console.log("ERROR AT LOGIN IN ROUTES:", err)
            return next(err)
        }
    })

    /* Route handler for user logout, removes current user
       from session */
    router.post('/logout', async function(req,res,next){
        req.session.destroy(function(e){
            if(e){
            return res.status(500).json({success:false, error: e.message})
            }

            return res.status(200).json({success : true, message: "successfully logged out"})
        })
    })

    module.exports = router;