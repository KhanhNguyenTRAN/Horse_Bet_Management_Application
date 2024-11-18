const express = require('express');
const router = express.Router();
const RaceService = require('../domain/Race/RaceService');
const raceRepository = require('../infrastructure/RaceRepository');

const raceService = new RaceService(raceRepository);

router.get('/races', async (req, res) => {
    try {
        const races = await raceService.getRaces();
        res.status(200).json(races);
    } catch (error) {
        console.error("Error fetching races:", error); 
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
