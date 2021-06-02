const { RoleIds: RoleIds } = require("../constants.js");

module.exports = {
    name: 'rolldice',
    description: "Rolls a 6 sided dice",
    permission: RoleIds.Member,
    execute(message, args, discord, client)
    {
        message.channel.send("You rolled a " + Math.round(Math.random() * 6));
    }
}