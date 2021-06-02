const { RoleIds } = require("../../constants.js");

module.exports = {
    name: 'generalembed',
    description: "Rules Embed",
    permission: RoleIds.Moderator,
    execute(message, args, discord, client) {
        const generalEmbed = new discord.MessageEmbed()
        .setColor('#BF3B87')
        .addFields(
            {name: 'General chat - Posting Guidelines:', value: `• Any topic can be discussed but the server <#843759071559548958> must be followed
            
            • Be respectful. You are allowed an opinion but remain civil.
            • If you disagree with someone: keep replies constructive or do not respond
            
            • No discussions focused on sensitive or ontroversial topics:
            • Religion
            • Politics
            • Race - Sexual orientation
            
            • No role playing with the intention to troll - disrupt chat - post fake news
            
            • Do not reply to inappropriate content that breaks the server rules`
        }
        
        )
        .setTimestamp()
        .setFooter('Report inappropriate content by alerting the moderation team by @ing the mods role');
        
        message.channel.send(generalEmbed);
    }
}