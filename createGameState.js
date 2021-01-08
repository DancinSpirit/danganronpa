const mongoose = require("mongoose");

const db = require("./models");

db.Gamestate.create({currentChapter:1,currentDay:1,currentTime:"morning"});