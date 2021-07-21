const Discord = require('discord.js');

const disbut = require("discord-buttons");

let button = new disbut.MessageButton()
  .setStyle('url')
  .setURL(`https://feyz.ga/`) 
  .setLabel('Websiteye Git!');

exports.run = (client, message, params) => {
    let fields = []
    client.commands.map(c => fields.push({name: `${process.env.PREFIX}${c.help.name}`, value: `${c.help.description} \n Kullanım: ${process.env.PREFIX}${c.help.usage}`}))
    const embed = new Discord.MessageEmbed()
      .setTitle('Yardım menüsü.')
      .setDescription(`Yardım menüsü ${message.author} tarafından istendi!`)
      .addFields(fields)
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL());
    
    message.channel.send(embed,button);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım','yardim','help'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Yardım menüsü.',
  usage: 'yardım'
};