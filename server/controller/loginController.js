import { login } from '../services/authService.js';

export const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await login(email, password);
        res.json({ success: true, user, token });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};