import { register } from '../services/authService.js';

export const postRegister = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const { user, token } = await register(userName, email, password);
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};