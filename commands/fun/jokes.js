const https = require('https');
const { RoleIds } = require("../constants.js");

let options = {
    headers: {
        'User-Agent': 'Otasky',
        'Accept': 'text/plain'
    }
};



module.exports = {
    name: 'jokes',
    description: 'Says a joke',
    permission: RoleIds.Member,
    execute(message, args, discord, client)
    {
        let joke = '';
        let jokeApiUrl = '';

        args.on('dad', 0, false, () => {
            jokeApiUrl = 'https://icanhazdadjoke.com/';
        })
        .on('yomomma', 0, false, () => {
            jokeApiUrl = 'https://api.yomomma.info/';
        }).parse();

        https.get(jokeApiUrl, options, (res) => {
            res.on('data', (chunk) => {
                joke += chunk;
            });

            res.on('error', (err) => {
                message.channel.send('Sorry. Yo momma\'s so fat I can\'t see the jokes!');
            });

            res.on('end', () => {
                message.channel.send(joke);
            });
        });
    }
};
