const Race = require('./Race');

class RaceService {
    constructor(raceRepository) {
        this.raceRepository = raceRepository;
    }

    async createRace(data) {
        const race = new Race(data.name, data.location, data.date, data.horses);
        return await this.raceRepository.save(race);
    }

    async getRaces() {
        return await this.raceRepository.findAll();
    }

    async getRaceById(id) {
        return await this.raceRepository.findById(new ObjectId(id));
    }
}

module.exports = RaceService;
