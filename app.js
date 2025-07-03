const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const sensorRoutes = require('./routes/sensorData');
const reportRoutes = require('./routes/reports');
const authRoutes = require('./routes/auth.routes');
const sensorRoutesV2 = require('./routes/sensor.routes');
const alertRoutes = require('./routes/alert.routes');
const reportRoutesV2 = require('./routes/report.routes');

app.use('/api/sensor', sensorRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sensors', sensorRoutesV2);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutesV2);

app.get('/', (req, res) => res.send('PowerGuardian+ Backend Running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
