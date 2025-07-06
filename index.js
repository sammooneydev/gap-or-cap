require("dotenv/config"); //dotenv file required to access the DISCORD_TOKEN environment variable
const { Client, IntentsBitField } = require("discord.js"); 
const { CommandHandler } = require("djs-commander"); 
const path = require("path"); //defining node path module for use in working with directory paths

//setting up the bot's persmissions within the codebase
//this bot can access servers and their messages, as well as polls and reactions, and the content of messages
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessagePolls,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent,
  ],
});

//setting up the command handler, which contains the route to the 'commands' directory
new CommandHandler({
  client,
  commandsPath: path.join(__dirname, "commands"),
});

//small piece of code that logs the discord account information to the console once the bot is running
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

//using the bot's discord token to launch the bot
client.login(process.env.DISCORD_TOKEN);
