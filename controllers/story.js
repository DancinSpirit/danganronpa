/* External Modules */
const express = require("express");

/* Interal Modules */
const db = require("../models");
const bot = require("../bot.js");

/* Instanced Modules */
const router = express.Router();

router.get("/:chapter/:day/:time/:player", async function (req,res){
    try{
        if(req.session.currentUser){
            if(req.session.currentUser.player){
                id = req.session.currentUser.player._id;
            }else{
                id = 0;
            }
        }
        else{
            res.redirect("/");
        }
        if((id === req.params.player)||(req.session.currentUser.type==="Gamemaster"||req.session.currentUser.type==="Observer")){
            const player = await db.Player.findById(req.params.player);
            const story = await db.Story.findOne({chapter: req.params.chapter, day: req.params.day, time: req.params.time, player: player.name});
            let storyArray = story.story;
            for(let x=0; x<storyArray.length; x++){
                storyArray[x] = storyArray[x].story;
            }
            for(let x=0; x<storyArray.length-1; x++){
                storyArray[x] = storyArray[x].concat(",");
            }
            res.render("story", {story: storyArray, chapter: req.params.chapter, day: req.params.day, time: req.params.time, player: req.params.player});
        }
        else{
            console.log("ERROR?!");
        }
    } catch (err){
        console.log(err);
        res.send(err)
    }
})

router.post("/gamemaster/:chapter/:day/:time/:player/:form", async function(req,res){
    try{
        const player = await db.Player.findById(req.params.player.trim());
        await bot.channels.cache.get(player.storyChannel).send(req.params.form);
        //await db.Story.updateOne({chapter: req.params.chapter.trim(), day: req.params.day.trim(), time: req.params.time.trim(), player: player.name},{$push: {story: {story: req.params.form, id: sentMessage.id}}});
        res.send(req.params.form)
    }catch(err){
        console.log(err);
    }
})

router.post("/player/:chapter/:day/:time/:player/:form", async function(req,res){
    try{
        const player = await db.Player.findById(req.params.player.trim());
        await bot.channels.cache.get(player.responseChannel).send(req.params.form);
        //await db.Story.updateOne({chapter: req.params.chapter.trim(), day: req.params.day.trim(), time: req.params.time.trim(), player: player.name},{$push: {story: {story: req.params.form, id: sentMessage.id}}});
        res.send(req.params.form)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;