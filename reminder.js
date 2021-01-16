const bot = require("./bot.js");

const reminder = function(){
    bot.guilds.cache.get('659245797333925919').channels.cache.get('799874873714802739').send(`<@&${'660664223625641994'}> This is an end of day reminder reminding you that it's your turn! Do note that this is currently a test message, but it should still technically be true! ^_^`);
}
reminder();