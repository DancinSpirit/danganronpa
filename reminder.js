const bot = require("./bot.js");
const TOKEN = process.env.TOKEN;
bot.destroy();
bot.login(TOKEN);