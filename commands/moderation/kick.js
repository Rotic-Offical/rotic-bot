const { RoleIds } = require("../constants.js");

module.exports = {
    name: 'kick',
    description: "This kicks a member",
    permission: RoleIds.Moderator,
    execute(message, args, discord, client)
    {
        const member = message.mentions.users.first();
        if (member)
        {
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.kick();
            message.channel.send("User has been kicked");
        }
        else
        {
            message.channel.send('You can not kick that member');
        }
    }
}