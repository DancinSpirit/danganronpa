const {Client} = require("discord.js-light");
const bot = new Client({
    cacheChannels: true
});
const TOKEN = process.env.TOKEN;
const db = require("./models");
bot.login(TOKEN);

bot.on("ready", ()=>{
    console.log(`Logged In as ${bot.user.tag}`)
});

bot.on("message", async (msg) =>{
    let player = false;
    if(msg.channel.id==="664307849090039839"){
        player = await db.Player.findOne({name: "Cameron"});
    }
    else if(msg.channel.id==="664627996174581800"){
        player = await db.Player.findOne({name: "Kristian"});
    }
    else if(msg.channel.id==="664628115984613406"){
        player = await db.Player.findOne({name: "Tim"});
    }
    if(player){
        const story = await db.Story.findOne({chapter: 1, day: 1, time: "morning", player: player.name});
            story.story.push({story: msg.content, id: msg.id});
            console.log("Added " + msg.content + " to story.");
            await story.save();
    }
    else{
        
    }
})

bot.on('messageUpdate', async (oldMessage, newMessage) => {
let player = false;
if(newMessage.channel.id==="664307849090039839"){
    player = await db.Player.findOne({name: "Cameron"});
}
else if(newMessage.channel.id==="664627996174581800"){
    player = await db.Player.findOne({name: "Kristian"});
}
else if(newMessage.channel.id==="664628115984613406"){
    player = await db.Player.findOne({name: "Tim"});
}
if(player){
    const story = await db.Story.updateOne({chapter: 1, day: 1, time: "morning", player: player.name, story: {$elemMatch: {id: newMessage.id}}}, {$set: {"story.$.story" : newMessage.content}});
    console.log(story);
    console.log("Successfuly Edited: " + newMessage.content);
}
else{   
} 
})

bot.on("messageDelete", async (message)=>{
let player = false;
if(message.channel.id==="664307849090039839"){
    player = await db.Player.findOne({name: "Cameron"});
}
else if(message.channel.id==="664627996174581800"){
    player = await db.Player.findOne({name: "Kristian"});
}
else if(message.channel.id==="664628115984613406"){
    player = await db.Player.findOne({name: "Tim"});
}
if(player){
    const story = await db.Story.updateOne({chapter: 1, day: 1, time: "morning", player: player.name, story: {$elemMatch: {id: message.id}}}, {$pull: {story: {id: message.id}}});
    console.log(story);
    console.log("Successfully Deleted From Database.");
}
else{   
} 
})

module.exports = bot;