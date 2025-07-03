const db = require('../config/db');

// POST /api/sensors — Add new sensor reading
exports.addReading = (req, res) => {
  const { device_id, voltage, current, temperature } = req.body;

  const query = 'INSERT INTO sensor_readings (device_id, voltage, current, temperature, timestamp) VALUES (?, ?, ?, ?, NOW())';

  db.query(query, [device_id, voltage, current, temperature], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    res.status(201).json({ message: 'Sensor reading added' });
  });
};

// GET /api/sensors/latest — Get latest reading per device
exports.getLatestReadings = (req, res) => {
  const query = `SELECT r.* FROM sensor_readings r INNER JOIN (
    SELECT device_id, MAX(timestamp) AS max_time FROM sensor_readings GROUP BY device_id
  ) latest ON r.device_id = latest.device_id AND r.timestamp = latest.max_time`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    res.status(200).json(results);
  });
};

// GET /api/sensors/history?device_id=1
exports.getSensorHistory = (req, res) => {
  const { device_id } = req.query;

  const query = 'SELECT voltage, current, temperature, timestamp FROM sensor_readings WHERE device_id = ? ORDER BY timestamp DESC LIMIT 100';

  db.query(query, [device_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    res.status(200).json(results);
  });
}; 