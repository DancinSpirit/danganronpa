const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");

/* Home Page */
router.get("/", async function(req,res){
    const currentGameState = await db.Gamestate.findOne({});
    console.log(currentGameState);
    res.render("main",{gamestate: currentGameState});
});

/* Register Route */
router.post("/register", async function(req,res){
    try{
        const foundUser = await db.User.findOne({username: req.body.username});
        if(foundUser) return res.send("This username already exists!");
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        req.body.type = "Observer";
        const newUser = await db.User.create(req.body);
        console.log(newUser);
        return res.send("Registration Successful!");
    }catch(err){
        console.log(err);
        return res.send(err);
    }    
});

/* Login Route */
router.post("/login", async function(req,res){
    try{
        const foundUser = await db.User.findOne({username: req.body.username});
        const foundPlayer = await db.Player.findById(foundUser.player);
        if(!foundUser) return res.send({displayText: "That username doesn't exist!"})
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match) return res.send({displayText: "Password Invalid"});
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
            type: foundUser.type,
            player: foundPlayer
        }
        if(foundUser.type==="Player"){
            console.log(foundPlayer);
            return res.send({displayText: foundUser.player.Ultimatename, type: foundUser.type, player: foundPlayer});
        }
        else
            return res.send({displayText: "Gamemaster Screen", type: foundUser.type})
    }catch(err){
        return res.send(err);
    }    
})

module.exports = router;