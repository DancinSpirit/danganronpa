const {Client} = require("discord.js-light");
const bot = new Client({
    cacheChannels: true
});
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env.TOKEN;

bot.on("ready", ()=>{
    bot.channels.cache.get('799874873714802739').send(`<@&${'660664223625641994'}> This is an end of day reminder reminding you that it's your turn!`);
});


bot.login(TOKEN);
setTimeout((function(){
    return process.exit();
}), 1000);
