const { RoleIds } = require("../constants.js");

function generateNumber(max, min)
{
    let difference = max - min;
    return (Math.round(Math.random() * difference) + min);
}

module.exports = {
    name: 'randomnumber',
    description: "Rolls a random number",
    aliases: ['rn'],
    permission: RoleIds.Member,
    execute(message, args, discord, client)
    {
        let max = 100;
        let min = 0;

        if (args.length == 1)
        {
            max = Number(args[0]);
        }
        else if (args.length == 2)
        {
            max = Number(args[1]);
            min = Number(args[0]);
        }

        message.channel.send("Your random number is: " + generateNumber(max, min));
    }
}
