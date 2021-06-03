const { RoleIds } = require("./constants.js");

module.exports = {
    name: 'test',
    description: 'Test command',
    usage: 'foo <bar>',
    permission: RoleIds.Owner,
    execute(message, args, discord, client)
    {
        // Example:        req   opt
        //           cmd   arg0  arg1
        //          ;test  foo   bar
        // Required argument called foo at argument index 0
        // Optional argument called bar at argument index 1 
        
        args.on('foo', 0, false, () => {
            message.channel.send('Foo!');
        })
        .on('bar', 1, true, () => {
            message.channel.send('Bar!');
        }).parse();
    }
};
