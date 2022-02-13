require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
global.client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
require('./deploy-commands');

require('./util/eventLoader')();

client.elevation = (interaction,perms) => {
    if (!interaction.member) return true;
    if (interaction.user.id === "441221465019514881") return true;
    if (interaction.member.permissions.has(perms)) return true;
    return false;
};

module.exports = client.login(process.env.TOKEN);