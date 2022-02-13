module.exports = async (interaction) => {
    if (!interaction.isCommand()) return;
    let cmd;
    if (client.commands.has(interaction.commandName)) {
        cmd = client.commands.get(interaction.commandName);
    }
    if(cmd){        
        if(cmd.conf.guildonly && !interaction.member){
            return interaction.reply({content:"Only guild!",ephemeral:true})
        }

        let perms = client.elevation(interaction,cmd.conf.perms);
        if(!perms) return interaction.reply({content:"You don't have permissons!",ephemeral:true});
        try {
            cmd.run(interaction,perms);
        } catch (err) {
            interaction.reply({content:'Error giving error reported!',ephemeral:true});
            console.log(err);
        }
    }
}