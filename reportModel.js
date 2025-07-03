const db = require('../config/db');

exports.submitReport = (report, callback) => {
  const { device_id, issue_type, description, reported_by } = report;
  const sql = 'INSERT INTO reports (device_id, issue_type, description, reported_by) VALUES (?, ?, ?, ?)';
  db.query(sql, [device_id, issue_type, description, reported_by], callback);
};

exports.getReports = (callback) => {
  db.query('SELECT * FROM reports ORDER BY timestamp DESC', callback);
};
