const Discord = require('discord.js');

const disbut = require("discord-buttons");

exports.run = (client, message, args, db) => {
    if(!args[0] || !args[1]){
        message.channel.send('Örnek kullanım: !link-kisalt <id> <url>')
    }else{
        if (db.has(args[0])) {
            message.channel.send('Bu id daha önceden alınmış!');
          } else {
            db.set(`${args[0]}`, {
              url: args[1],
              id: args[0],
              ip: `discord-${message.author.id}`
            });
            let button = new disbut.MessageButton()
              .setStyle('url')
              .setURL(`https://feyz.ga/${args[0]}`) 
              .setLabel('Git!');
            message.channel.send('Url kısaltıldı!',button)
          }
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['linkkisalt','kisalt','url-short'],
  permLevel: 0
};

exports.help = {
  name: 'link-kisalt',
  description: 'Link kısaltma komutu.',
  usage: 'link-kisalt'
};