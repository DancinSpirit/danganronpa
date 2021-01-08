/* External Modules */
const express = require("express");

/* Interal Modules */
const db = require("../models");

/* Instanced Modules */
const router = express.Router();

router.get("/:chapter/:day/:time/:player", async function (req,res){
    try{
        if(req.session.currentUser){
        console.log(req.session.currentUser.gamemaster);
        if(req.session.currentUser.player){
            id = req.session.currentUser.player._id;
        }else{
            id = 0;
        }
        }
        else{
            res.redirect("/");
        }
        if((id === req.params.player)||(req.session.currentUser.gamemaster)){
            const player = await db.Player.findById(req.params.player);
            const story = await db.Story.findOne({chapter: req.params.chapter, day: req.params.day, time: req.params.time, player: player.name});
            let storyArray = story.story;
            for(let x=0; x<storyArray.length; x++){
                storyArray[x] = storyArray[x].story;
            }
            for(let x=0; x<storyArray.length-1; x++){
                storyArray[x] = storyArray[x].concat(",");
            }
            res.render("story", {story: storyArray});
        }
        else{
            console.log("ERROR?!");
        }
    } catch (err){
        console.log(err);
        res.send(err)
    }
})

module.exports = router;