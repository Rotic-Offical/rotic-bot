const { RoleIds } = require("../constants.js");

module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion'],
    description: "Users give suggestions",
    permission: RoleIds.Member,
    execute(message, args, discord, client)
    {
        const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');

        if(!channel)
            return message.channel.send('Suggestions channel can not be found!')

        message.channel.send('Suggestion given')

        let messageArgs = args.join(' ');
        const embed = new discord.MessageEmbed()
        .setColor('#C5BF6F')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
        .setDescription(messageArgs);

        channel.send(embed).then((msg) => {
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err) =>{
            throw err;
        });
    }
}
