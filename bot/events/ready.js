const Discord = require('discord.js');

module.exports = () => {
  console.log(`BOT: Şu an ` + client.channels.cache.size + ` adet kanala, ` + client.guilds.cache.size + ` adet sunucuya ve ` + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!!`);
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`!help - 0 kişiyi`, { type: "WATCHING" });
  client.user.setStatus("idle");
};