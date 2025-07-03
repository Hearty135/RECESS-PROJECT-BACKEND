const Sensor = require('../models/sensorModel');

exports.receiveData = (req, res) => {
  Sensor.insertSensorData(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Sensor data recorded.' });
  });
};

exports.getData = (req, res) => {
  Sensor.getAllSensorData((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
