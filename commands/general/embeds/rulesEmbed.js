const { RoleIds } = require('../../constants.js');

module.exports = {
    name: 'rulesembed',
    description: "Rules Embed",
    permission: RoleIds.Moderator,
    execute(message, args, discord, client)
    {
        const rulesEmbed = new discord.MessageEmbed()
            .setColor('#BF3B87')
            .addFields(
                {name: 'Rule 1', value: 'Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism, or hate speech will be tolerated.'},
                {name: 'Rule 2', value: 'No spam or self-promotion (server invites, advertisements, etc) without permission from a staff member. This includes DMing fellow members.'},
                {name: 'Rule 3', value: 'No NSFW or obscene content. This includes text, images, or links featuring nudity, sex, hard violence, or other graphically disturbing content.'},
                {name: 'Rule 4', value: 'If you see something against the rules or something that makes you feel unsafe, let staff know. We want this server to be a welcoming space!'},
                {name: 'Rule 5', value: 'Rule 1 & 3 do not include if you are only joking, just dont take it too far.'},
            )
            .setTimestamp()
            .setFooter('Rules are subject to change at any time.');
    
        message.channel.send(rulesEmbed);
    }
}