const { RoleIds } = require("../constants.js");

module.exports = {
    name: 'lock',
    description: "Locks a channel",
    permission: RoleIds.Moderator,
    async execute(message, args, discord, client)
    {
        await message.channel.overwritePermissions([{
            id: message.guild.roles.cache.find(r => r.name == "Member"),
            deny: ['SEND_MESSAGES']
        }]);
        message.channel.send("Channel is now locked");
    }
}