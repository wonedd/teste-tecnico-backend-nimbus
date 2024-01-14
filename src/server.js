const http = require('http');
const url = require('url');
const getDamageSummaryByDateRoute = require('./get-damage-summary-by-date/route');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const urlParams = new URLSearchParams(parsedUrl.query);

  if (parsedUrl.pathname === '/damage-summary-by-date' && req.method === 'GET') {
    if (typeof getDamageSummaryByDateRoute.fn === 'function') {
      const queryParams = Object.fromEntries(urlParams.entries());
      getDamageSummaryByDateRoute.fn(req, res, queryParams);
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
  }
});

module.exports = server;
