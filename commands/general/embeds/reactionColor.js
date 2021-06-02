const { DiscordAPIError } = require("discord.js");
const { RoleIds: Roles, ChannelIds: Channels } = require('../../constants.js');

const BLUE_HEART_EMOJI ='💙';
const ORANGE_HEART_EMOJI ='🧡';
const RED_HEART_EMOJI ='❤️';
const PURPLE_HEART_EMOJI ='💜';
const LIME_HEART_EMOJI ='💚';
const YELLOW_HEART_EMOJI ='💛';

module.exports = {
    name: 'reactioncolor',
    description: "Reaction color",
    permission: Roles.Moderator,
    async processReactionColor(added, message, reaction, user)
    {
        if (reaction.message.partial)
            await reaction.message.fetch();
        
        if (reaction.partial)
            await reaction.fetch();
        
        if (user.bot || !reaction.message.guild)
            return;
        
        const blueColor = message.guild.roles.cache.find(role => role.name === "Blue");
        const orangeColor = message.guild.roles.cache.find(role => role.name === "Orange");
        const redColor = message.guild.roles.cache.find(role => role.name === "Red");
        const purpleColor = message.guild.roles.cache.find(role => role.name === "Purple");
        const limeColor = message.guild.roles.cache.find(role => role.name === "Lime");
        const yellowColor = message.guild.roles.cache.find(role => role.name === "Yellow");
        
        if (reaction.message.channel.id == Channels.ReactionRoles.id)
        {
            let roles = reaction.message.guild.members.cache.get(user.id).roles;
            let addRemove = (added ? roles.add : roles.remove).bind(roles);
            
            if (reaction.emoji.name == BLUE_HEART_EMOJI)
                await addRemove(blueColor);
            else if (reaction.emoji.name == ORANGE_HEART_EMOJI)
                await addRemove(orangeColor);
            else if (reaction.emoji.name == RED_HEART_EMOJI)
                await addRemove(redColor);
            else if (reaction.emoji.name == PURPLE_HEART_EMOJI)
                await addRemove(purpleColor);
            else if (reaction.emoji.name == LIME_HEART_EMOJI)
                await addRemove(limeColor);
            else if (reaction.emoji.name == YELLOW_HEART_EMOJI)
                await addRemove(yellowColor);
        }
    },
    async execute(message, args, discord, client)
    {
        let embed = new discord.MessageEmbed()
        .setColor('#BF3B87')
        .setTitle('Choose your role color!')
        .setDescription('Choosing one of the options listed below will change it in the members list to the respective color!');
        
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(BLUE_HEART_EMOJI);
        messageEmbed.react(ORANGE_HEART_EMOJI);
        messageEmbed.react(RED_HEART_EMOJI);
        messageEmbed.react(PURPLE_HEART_EMOJI);
        messageEmbed.react(LIME_HEART_EMOJI);
        messageEmbed.react(YELLOW_HEART_EMOJI);

        message.delete();
    }
}