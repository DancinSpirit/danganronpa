const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true, minlength: 8 },
    type: {type: String, required: true}, /* Types: Player, Gamemaster, Observer */
    player: {type: mongoose.Schema.Types.ObjectId, ref: "Player"}
  },
  {timestamps: true}
)

const User = mongoose.model("User", userSchema);

module.exports = User;