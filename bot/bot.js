const Discord = require("discord.js");
const fs = require("fs");

module.exports = async (client,db) => {
    require("./util/eventLoader")(client);

    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    fs.readdir(__dirname + '\\komutlar', (err, files) => {
        if (err) console.error(err);
        console.log(`${files.length} komut yüklenecek.`);
        files.forEach(f => {
          let props = require(`./komutlar/${f}`);
          console.log(`Yüklenen komut: ${props.help.name}.`);
          client.commands.set(props.help.name, props);
          props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
          });
        });
      });

      client.elevation = message => {
        if (message.channel.type === 'dm') {
          return;
        }
        let permlvl = 0;
        if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 2;
        if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
        if (message.author.id === process.env.sahip) permlvl = 4;
        return permlvl;
      };
}