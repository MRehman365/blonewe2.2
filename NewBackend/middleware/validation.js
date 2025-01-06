const validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;

    const errors = [];

    if (!name) errors.push('Name is required');
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    next();
};

module.exports = { validateRegistration }; 