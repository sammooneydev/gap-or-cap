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