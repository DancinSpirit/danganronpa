const express = require('express');
const router = express.Router();

router.get("/", async function(req,res){
    try{
        res.render("trial/base.ejs");
    }catch(err){
        console.log(err);
    }
})

module.exports = router;