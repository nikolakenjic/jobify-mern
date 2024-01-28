import { Router } from 'express';
import { login, logout, register } from '../controllers/authController.js';
import {
  validateLoginUser,
  validateRegisterUser,
} from '../middleware/validatorMiddleware.js';
const router = Router();

router.post('/register', validateRegisterUser, register);

router.post('/login', validateLoginUser, login);

router.get('/logout', logout);

export default router;
