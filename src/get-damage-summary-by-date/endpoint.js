const controller = require('./controller');

module.exports = {
    async execute(req, res, queryParams) {
        try {
            const { dateStart, dateEnd } = queryParams || {};

            if (!dateStart || !dateEnd) {
                return res.writeHead(400, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'As datas de início e fim são obrigatórias.' }));
            }

            const result = await controller.execute(dateStart, dateEnd);

            res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ data: result }));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'application/json' }).end(JSON.stringify({ error: 'Erro interno do servidor' }));
        }
    },
};
