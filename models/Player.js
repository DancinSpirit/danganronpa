const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        characterName: {type: String},
        ultimateName: {type: String},
        avatar: {type: String},
        discordId: {type: String},
        storyChannel: {type: String},
        responseChannel: {type: String}
    },
    {timestamps: true}
)

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;