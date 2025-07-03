const db = require('../config/db');

// POST /api/reports
exports.createReport = (req, res) => {
  const { user_id, location, message, photo_url } = req.body;

  if (!user_id || !location || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const query = 'INSERT INTO reports (user_id, location, message, photo_url) VALUES (?, ?, ?, ?)';

  db.query(query, [user_id, location, message, photo_url || null], (err, result) => {
    if (err) {
      console.error('Report DB error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Report submitted successfully' });
  });
};

// GET /api/reports
exports.getAllReports = (req, res) => {
  const query = 'SELECT * FROM reports ORDER BY timestamp DESC';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
}; 