const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    if(!user){
        let avatar = message.author.displayAvatarURL({dynamic:true});
        let Embed = new Discord.MessageEmbed()
            .setTitle(`Avatarın!`)
            .setThumbnail(avatar)
            .setColor(`RANDOM`)
            .setDescription(`Feyz.ga`)
            .setTimestamp()
            .setFooter(message.author.username, avatar)
        return message.channel.send(Embed);
    }else{
        let avatar = user.displayAvatarURL({dynamic:true});
        let Embed = new Discord.MessageEmbed()
            .setTitle(`Avatarı: ${user.username}`)
            .setThumbnail(avatar)
            .setColor(`RANDOM`)
            .setDescription(`Pandacuk Bot`)
            .setTimestamp()
            .setFooter(message.author.username, avatar)
        return message.channel.send(Embed);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avatar','profil'],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'İstediğiniz kişinin avatarını gösterir.',
  usage: 'avatar [kullanıcı]'
};