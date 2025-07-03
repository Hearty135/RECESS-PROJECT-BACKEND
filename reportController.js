const Report = require('../models/reportModel');

exports.submitReport = (req, res) => {
  Report.submitReport(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Report submitted.' });
  });
};

exports.getReports = (req, res) => {
  Report.getReports((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
