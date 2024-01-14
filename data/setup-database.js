const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('alerts.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      event TEXT,
      damage INTEGER
    )
  `);

  const alertsData = require('./alerts.json');
  const stmt = db.prepare('INSERT INTO alerts (date, event, damage) VALUES (?, ?, ?)');

  alertsData.forEach(({ date, event, damage }) => {
    stmt.run(date, event, damage);
  });

  stmt.finalize();
});

db.close();
