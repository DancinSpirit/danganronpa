const mongoose = require("mongoose");

const gamestateSchema = new mongoose.Schema(
    {
        currentChapter: {type: Number},
        currentDay: {type: Number},
        currentTime: {type: String}
    },
    {timestamps: true}
)

const Gamestate = mongoose.model("Gamestate", gamestateSchema);

module.exports = Gamestate;