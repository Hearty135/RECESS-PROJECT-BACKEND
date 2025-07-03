const db = require('../config/db');

// POST /api/alerts
exports.createAlert = (req, res) => {
  const { device_id, type, message } = req.body;

  if (!device_id || !type || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const query = 'INSERT INTO alerts (device_id, type, message) VALUES (?, ?, ?)';

  db.query(query, [device_id, type, message], (err, result) => {
    if (err) {
      console.error('DB Alert Error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Alert logged successfully' });
  });
};

// GET /api/alerts
exports.getAllAlerts = (req, res) => {
  const query = 'SELECT * FROM alerts ORDER BY timestamp DESC';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
}; 