const endpoint = require('./endpoint');

module.exports = {
    method: 'GET',
    path: '/damage-summary-by-date',
    fn: endpoint.execute,
};
