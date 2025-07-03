const db = require('../config/db');

exports.insertSensorData = (data, callback) => {
  const { device_id, voltage, current, temperature } = data;
  const sql = 'INSERT INTO sensor_data (device_id, voltage, current, temperature) VALUES (?, ?, ?, ?)';
  db.query(sql, [device_id, voltage, current, temperature], callback);
};

exports.getAllSensorData = (callback) => {
  db.query('SELECT * FROM sensor_data ORDER BY timestamp DESC', callback);
};
