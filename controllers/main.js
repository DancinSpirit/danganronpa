const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");

router.get("/", async function(req,res){
    const currentGameState = await db.Gamestate.findOne({});
    console.log(currentGameState);
    res.render("main",{gamestate: currentGameState});
});

router.post("/register", async function(req,res){
    try{
        const foundUser = await db.User.findOne({username: req.body.username});
        if(foundUser) return res.send("This username already exists!");
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        req.body.gamemaster = true;
        const newUser = await db.User.create(req.body);
        console.log(newUser);
        return res.send("Registration Successful!");
    }catch(err){
        console.log(err);
        return res.send(err);
    }    
});

router.post("/login", async function(req,res){
    try{
        const foundUser = await db.User.findOne({username: req.body.username});
        if(!foundUser) return res.send("That username doesn't exist!")
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match) return res.send("Password Invalid");
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
            gamemaster: foundUser.gamemaster,
            player: foundUser.player
        }
        if(!foundUser.gamemaster)
            return res.send(foundUser.player.Ultimatename)
        else
            return res.send("Gamemaster Screen")
    }catch(err){
        return res.send(err);
    }    
})

module.exports = router;