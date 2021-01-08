const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/danganronpa";

mongoose.connect(dbUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongodb disconnected");
});

mongoose.connection.on("connected", function(){
    console.log("Mongodb connected");
});

mongoose.connection.on("error", function(err){
    console.log("Mongodb error: ", err);
});

module.exports = {
    Player: require("./Player"),
    User: require("./User"),
    Story: require("./Story"),
    Gamestate: require("./Gamestate")
}