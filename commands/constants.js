const roles = {
    Member: { privilege: 1, id: '843760057358876673' },
    Moderator: { privilege: 2, id: '844535708155641867' },
    Owner: { privilege: 3, id: '849048045769326612' },
};

const channels = {
    ReactionRoles: { id: '843807042275246090' }
};

const messages = {
    ReactionColor: { id: '849236895652380682' }
};

module.exports = {
    RoleIds: Object.freeze(roles),
    ChannelIds: Object.freeze(channels),
    MessageIds: Object.freeze(messages),
    BotName: Object.freeze('')
};
