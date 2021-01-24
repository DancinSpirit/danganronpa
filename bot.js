const {Client} = require("discord.js-light");
const bot = new Client({
    cacheChannels: true
});
const TOKEN = process.env.TOKEN;
const db = require("./models");

bot.login(TOKEN);

bot.reminder = function(){
    bot.channels.cache.get('799874873714802739').send(`<@&${'660664223625641994'}> This is an end of day reminder reminding you that it's your turn! Do note that this is currently a test message, but it should still technically be true! ^_^`);
}

bot.on("ready", ()=>{
    bot.reminder();
    console.log(`Logged In as ${bot.user.tag}`)
});

bot.on("message", async (msg) =>{
    let player = false;
    player = await db.Player.findOne({storyChannel: msg.channel.id});
    if(player){
        if(msg.content != "<END>"){
        const story = await db.Story.findOne({chapter: 1, day: 1, time: "morning", player: player.name});
        story.story.push({story: msg.content, id: msg.id});
        console.log("Added " + msg.content + " to story.");
        await story.save();
        }else{
            let role = await msg.guild.roles.fetch('660664223625641994');
            let account = await msg.guild.members.fetch(player.discordId);
            account.roles.add(role);
            bot.delete_message(msg);
        }
    }
    else{
    //This is for response channel
    player = await db.Player.findOne({responseChannel: msg.channel.id});
    if(player){
        let role = await msg.guild.roles.fetch('660664223625641994');
        msg.member.roles.remove(role);
    }    
    }
})

bot.on('messageUpdate', async (oldMessage, newMessage) => {
let player = false;
player = await db.Player.findOne({storyChannel: newMessage.channel.id});
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
player = await db.Player.findOne({storyChannel: message.channel.id});
if(player){
    const story = await db.Story.updateOne({chapter: 1, day: 1, time: "morning", player: player.name, story: {$elemMatch: {id: message.id}}}, {$pull: {story: {id: message.id}}});
    console.log(story);
    console.log("Successfully Deleted From Database.");
}
else{   
} 
})

module.exports = bot;