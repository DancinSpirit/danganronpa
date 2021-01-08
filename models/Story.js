const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    chapter: {type: Number, required: true},
    day: {type: Number, required: true},
    time: {type: String, required: true},
    player: {type: String, required: true},
    story: [{story: {type: String}, id: {type: String}}]
  },
  {timestamps: true}
)

const Story = mongoose.model("Story", storySchema);

module.exports = Story;