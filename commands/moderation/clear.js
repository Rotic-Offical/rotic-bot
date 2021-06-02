const { RoleIds } = require("../constants.js");

module.exports = {
    name: 'clear',
    description: "Clears text chats",
    cooldown: 15,
    permission: RoleIds.Moderator,
    async execute(message, args, discord, client)
    {
        if(!args[0]) return message.reply("Please enter the amount of messages you want to clear!   ");
        if(isNaN(args[0])) return message.reply("Please enter a real number!");
        
        if(args[0] > 100) return message.reply("You can't delete more than 100 messages!");
        if(args[0] < 1) return message.reply("You must delete at least one message!");
        
        try
        {
            await message.channel.messages.fetch({limit: args [0]}).then(messages => {
                message.channel.bulkDelete(messages);
            });
        } catch (error)
        {
            message.reply('Can\'t delete messages over 14 days!');
        }
    }
}   
