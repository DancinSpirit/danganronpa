const express = require("express");
const methodOverride = require("method-override");

//const db = require("./models");
//const ctrl = require("./controllers");

const app = express();

const PORT = 11037;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/", function(req,res){
    res.render("login");
})


app.use(function (req,res){
    res.send("Page Not Found");
})
app.listen(PORT, function(){
    console.log(`Live at http://localhost:${PORT}/`);
})