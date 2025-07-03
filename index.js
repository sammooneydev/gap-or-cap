require('dotenv/config');
const { Client, IntentsBitField } = require ('discord.js');
const { CommandHandler } = require('djs-commander');
const path = require('path');

const client = new Client({
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessagePolls,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.login(process.env.DISCORD_TOKEN);