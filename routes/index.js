const express = require('express');
const router = express.Router();

const betRoutes = require('./betRoutes');
const raceRoutes = require('./raceRoutes');
const userRoutes = require('./userRoutes');

router.use('/api', betRoutes);
router.use('/api', raceRoutes);
router.use('/api', userRoutes);

module.exports = router;
