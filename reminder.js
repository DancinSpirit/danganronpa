const bot = require("./bot.js");
const TOKEN = process.env.TOKEN;
bot.loggedin = true;
bot.login(TOKEN);