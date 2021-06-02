const { RoleIds } = require("../constants.js");

module.exports = {
    name: 'headsortails',
    aliases: ['hort'],
    description: "Heads or Tails command",
    permission: RoleIds.Member,
    execute(message, args, discord, client)
    {
        let coinSide = Math.floor(Math.random() * 2) == 0 ? 'heads' : 'tails';
        message.channel.send(`You got **${coinSide}**`)
    }
}