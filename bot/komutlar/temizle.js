const Discord = require('discord.js');


exports.run = function(client, message, args) {
    if(!args[0]) return message.reply('Lütfen bir mesaj belirt. **Doğru Kullanım**: !emojiyazı <mesaj>');
    message.delete()
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${args[0]} kadar mesaj sildim!`).then((msg) => {
            msg.delete({ timeout: 3000 })
        });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true, 
  aliases: ['sil'],
  permLevel: 3
};

exports.help = {
  name: 'temizle', 
  description: 'Belirtilen miktarda mesaj siler',
  usage: 'temizle <miktar>'
};
