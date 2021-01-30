const express = require('express');
const router = express.Router();
const db = require("../models");

/* Create Player */
router.post("/", async function(req,res){
    try{
        const createdPlayer = await db.Player.create(req.body);
        return res.send("Character Created!");
    }catch(err){
        console.log(err);
    }
})

router.get("/", async function(req,res){
    try{
        req.session.currentUser.player = await db.Player.find({name: req.query.player});
        return res.send(req.session.currentUser.player[0]);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;