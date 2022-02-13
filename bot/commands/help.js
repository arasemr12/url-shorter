const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

exports.run = async (interaction,perms) => {
    let fields = [];
    client.commands.map(c => {
        fields.push({name:`/${c.data.name}`,value:`${c.data.description}`,inline:true})
    });

    let embed = new Discord.MessageEmbed()
        .setTitle("Commands list")
        .setDescription(`Requested by <@${interaction.user.id}>`)
        .addFields(fields)
        .setTimestamp()
        .setFooter({
            text:client.user.tag,
            iconURL: client.user.displayAvatarURL()
        })
        .setAuthor({
            name: `${interaction.user.username}#${interaction.user.discriminator}`,
            iconURL: interaction.user.displayAvatarURL()
        })
        .setColor('WHITE')
    
    let row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel('Web panel')
                .setStyle('LINK')
                .setURL(process.env.URL)
        )
    interaction.reply({embeds:[embed],components:[row]})
}

exports.data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('help command')

exports.conf = {
    perms: [],
    guildonly: false
}