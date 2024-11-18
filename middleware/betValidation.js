function validateBet(req, res, next) {
    const { userId, raceId, amount, odds } = req.body;

    // Check if all required fields are provided
    if (!userId || !raceId || !amount || !odds) {
        return res.status(400).json({ message: 'Missing required fields: userId, raceId, amount, and odds are required.' });
    }

    // Check if amount is a positive number
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount: must be a positive number.' });
    }

    // Check if odds is a positive number
    if (typeof odds !== 'number' || odds <= 0) {
        return res.status(400).json({ message: 'Invalid odds: must be a positive number.' });
    }

    // If all validations pass, move to the next middleware or route handler
    next();
}

module.exports = validateBet;
