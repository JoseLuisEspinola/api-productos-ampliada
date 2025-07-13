import express from 'express';
import {
  registerUser,
  getUsers,
  getUserByIdController,
  updateUserController,
  deleteUserController
} from '../controllers/user.controller.js';

import {validatePostUser} from '../middlewares/validatePostUser.js';
import {validatePutUser} from '../middlewares/validatePutUser.js';

const router = express.Router();

// Listar todos los usuarios
router.get('/', getUsers);

// Obtener usuario por ID
router.get('/:id', getUserByIdController);

// Crear usuario
router.post('/', validatePostUser, registerUser);

// Actualizar usuario por ID
router.put('/:id', validatePutUser, updateUserController);

// Eliminar usuario por ID
router.delete('/:id', deleteUserController);

export default router;
