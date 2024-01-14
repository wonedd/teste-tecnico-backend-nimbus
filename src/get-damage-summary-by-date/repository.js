const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('alerts.db');

module.exports = {
    async execute() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM alerts
                ORDER BY date DESC;
            `;

            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows);
            });
        });
    },
};
