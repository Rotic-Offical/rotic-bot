const { RoleIds } = require("../../constants.js");

module.exports = {
    name: 'verifyembed',
    description: "Verify Embed",
    permission: RoleIds.Moderator,
    execute(message, args, discord, client)
    {
        const verifyEmbed = new discord.MessageEmbed()
        .setColor('#BF3B87')
        .addFields({
            name: 'Verify',
            value: 'Make sure that your DMs are set to open so <@372022813839851520> can dm you instructions.'
        },
        )
        .setTimestamp()
        .setFooter('Please @ an admin if you\'re having trouble');
        
        message.channel.send(verifyEmbed);
    }
}