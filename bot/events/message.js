const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath: "./databases/database.json"
});

module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(process.env.PREFIX)) return;
  let command = message.content.split(' ')[0].slice(process.env.PREFIX.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return message.channel.send("Bu komutu kullanmak için iznin yok!");
    if(cmd.conf.guildOnly == true){
        if(message.channel.type === 'dm'){
            return message.channel.send("Bu komut DM için geçerli değildir!");
        }
    }
    cmd.run(client, message, params, db);
  }

};