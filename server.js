const express = require("express");
const methodOverride = require("method-override");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = require("./models");
const ctrl = require("./controllers");

const app = express();

const PORT = process.env.PORT || 11037;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.use(session({
    store: new MongoStore({
        url: "mongodb://localhost:27017/danganronpa"
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 1
    }  
}));

app.use(function(req,res,next){
    app.locals.user =  req.session.currentUser;
    next();
}) 

/* Check if Not Signed In */
authRequired = function(req,res,next){
    if(req.session.currentUser){
        next();
    } else {
        res.redirect("/login");
    }
}
/* Check if Gamemaster */
gamemasterRequired = function(req,res,next){
    if(req.session.currentUser.gamemaster){
        next();
    } else {
        res.redirect("/login");
    }  
}
app.use("/players", ctrl.players);

app.use("/story", ctrl.story);

app.post("/logout", function(req,res){
    req.session.destroy();
    return res.send("Logged Out");
})

app.use("/", ctrl.main);

app.get("*", function (req,res){
    res.send("Page Not Found");
})
app.listen(PORT, function(){
    console.log(`Live at http://localhost:${PORT}/`);
})