import express from 'express';
import { postLogin } from '../controller/loginController.js';
import { postRegister } from '../controller/registerController.js';

const router = express.Router();

router.post('/login', postLogin);
router.post('/register', postRegister);

export default router;








