const reqEvent = (event) => require(`../events/${event}`);
module.exports = () => {
  client.once('ready', reqEvent('ready'));
  client.on('interactionCreate', reqEvent('interactionCreate'));
  //client.on('message', reqEvent('message'));
};