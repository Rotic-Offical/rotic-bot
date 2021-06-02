const discord = require('discord.js');
const fs = require('fs');
const { MessageIds, RoleIds } = require('./commands/constants.js');
const { processReactionColor } = require('./commands/general/embeds/reactionColor');

const prefix = ';';
const client = new discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const cooldowns = new Map();
const commandFiles = walk('./commands');

client.commands = new discord.Collection();
for (const file of commandFiles)
{
    const command = require(file);
    client.commands.set(command.name, command);
}

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');     
    guildMember.roles.add(welcomeRole);
});

client.once('ready', () => {
    console.log('Otasky bot is online');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = getCommand(command);
    if (cmd !== undefined)
    {
        if (!hasPermission(message.member, cmd))
        {
            message.channel.send(`You do not have permission for ${cmd.name}`);
            return;
        }

        const { isCoolingDown, timeRemaining } = isInCooldown(cmd, message.author.id);
        if (isCoolingDown)
            return message.reply(`Please wait ${timeRemaining.toFixed(1)} more seconds before using ${cmd.name}`);

        try
        {
            cmd.execute(message, args, discord, client);
        }
        catch (error)
        {
            console.log(error);
        }
    }
    else
    {
        message.channel.send(command + ' is an invalid command!');
    }
});

client.on('messageReactionAdd', (reaction, user) => processReaction(true, reaction, user));
client.on('messageReactionRemove', (reaction, user) => processReaction(false, reaction, user));

function processReaction(added, reaction, user)
{
    if (reaction.message.id === MessageIds.ReactionColor.id)
    {
        processReactionColor(added, reaction.message, reaction, user);
    }
}

function hasPermission(member, cmd)
{
    let userPermission = RoleIds.Member;

    for (const roleObject in RoleIds)
    {
        const role = RoleIds[roleObject];

        if (member.roles.cache.has(role.id) && role.privilege >= userPermission.privilege)
            userPermission = role;
    }

    return userPermission.privilege >= cmd.permission.privilege;
}

function isInCooldown(cmd, userId)
{
    if (!cooldowns.has(cmd.name))
        cooldowns.set(cmd.name, new discord.Collection());

    const currentTime = Date.now();
    const timeStamps = cooldowns.get(cmd.name);
    const cooldownTime = (cmd.cooldown) * 1000;

    if (timeStamps.has(userId))
    {
        const expirationTime = timeStamps.get(userId) + cooldownTime;
        
        if (currentTime < expirationTime)
        {
            const timeRemaining = (expirationTime - currentTime) / 1000;
            return { isCoolingDown: true, timeRemaining: timeRemaining };
        }
    }

    timeStamps.set(userId, currentTime)
    setTimeout(() => timeStamps.delete(userId), cooldownTime)

    return { isCoolingDown: false };
}


function walk(dir)
{
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else { 
            let fileType = file.split('.').pop();
            if (fileType == 'js')
                results.push(file);
        }
    });
    return results;
}

function getCommand(typedCmd)
{
    let cmd = client.commands.find((command) => {
        if (command.name == typedCmd)
            return true;

        if (command.aliases != undefined)
        {
            if (command.aliases.includes(typedCmd))
                return true;
        }

        return false;
    });

    return cmd;
}

client.login('NjUyMzIzNjEzMDk3MDY2NTE2.XemxtA.dd3EzYX0hHV57UYv-S8cejtlhVs');