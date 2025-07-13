import express from 'express';
//import { login } from '../controllers/auth.controller.js';
import { login } from '../controllers/user.controller.js';


const router = express.Router();

// Ruta de login
router.post('/login', login);

// Exporto el router para usarlo en el servidor principal
export default router;