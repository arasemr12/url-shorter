const Discord = require('discord.js');

exports.run = async(app, message) => {
        const msg = await message.channel.send("Ping Alınıyor...");
        const Embed = new Discord.MessageEmbed()
            .setTitle("Pong!")
            .setAuthor(`${message.author.username}` , message.author.displayAvatarURL)
            .setDescription(
                `⌛ Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\n⏲️ API Ping is ${Math.round(app.ws.ping)}ms`
            )
            .setColor('#fb644c');
        msg.edit(Embed);
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['p'],
  permLevel: 0 
};

exports.help = {
  name: 'ping', 
  description: 'Botun pingini gösterir',
  usage: 'ping'
};
