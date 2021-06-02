const https = require('https');
const discord = require('discord.js');
const { RoleIds } = require("../../constants.js");

const URL = 'https://www.reddit.com/r/cats/hot/.json?limit=100'

module.exports = {
    name: 'cats',
    description: 'Sends top rising pictures of cats',
    permission: RoleIds.Member,
    execute(message, args)
    {
        https.get(URL, (result) => {
            var body = '';

            result.on('data', (chunk) => {
                body += chunk;
            });

            result.on('end', () => {
                var response = JSON.parse(body);
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data;

                var image = index.preview.images[0].source.url.replace('&amp;', '&');
                var title = index.title;
                var link = 'https://reddit.com' + index.permalink;
                var subRedditName = index.subreddit_name_prefixed;

                if (index.post_hint !== 'image')
                {
                    const textEmbed = discord.MessageEmbed()
                        .setTitle(subRedditName)
                        .setColor(9384170)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`);

                    message.channel.send(textEmbed);
                }
                else
                {
                    const imageEmbed = new discord.MessageEmbed()
                    .setTitle(subRedditName)
                    .setImage(image)
                    .setColor(9384170)
                    .setDescription(`[${title}](${link})`)
                    .setURL(`https://reddit.com/${subRedditName}`);
                
                    message.channel.send(imageEmbed);
                }
            });
            
            result.on('error', (e) => {
                console.log('Got an error: ' + e);
            })
        })
    },
}