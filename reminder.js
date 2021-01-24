const bot = require("./bot.js");
const TOKEN = process.env.TOKEN;
bot.loggedIn = true;
bot.login(TOKEN);