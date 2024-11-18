const User = require('./User');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(data) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Email is already in use');
        }

        const user = new User(data.name, data.email, data.balance || 0);
        return await this.userRepository.save(user);
    }

    async getUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(id) {
        return await this.userRepository.findById(new ObjectId(id));
    }
}

module.exports = UserService;
