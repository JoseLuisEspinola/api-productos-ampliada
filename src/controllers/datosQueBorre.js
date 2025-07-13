import { db } from '../config/firebase.js';
import jwt from 'jsonwebtoken';

import {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../services/user.service.js';


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifico que se envíen ambos campos
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    // Busco el usuario en Firestore
    const snapshot = await db.collection('usuarios').where('email', '==', email).get();

    if (snapshot.empty) {
      return res.status(401).json({ message: 'Credenciales inválidas (email no encontrado)' });
    }

    // Obtengo el documento
    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Verifico la contraseña (texto plano por ahora)
    if (userData.password !== password) {
      return res.status(403).json({ message: 'Credenciales inválidas (contraseña incorrecta)' });
    }

    // Creo el token JWT
    const payload = {
      id: userDoc.id,
      email: userData.email,
      rol: userData.rol,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // Expira en 1 hora
    });

    // Devuelvo el token
    return res.status(200).json({
      message: 'Login exitoso',
      token: `Bearer ${token}`,
    });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// **** Comienzo con USUARIOS
// Listo TODOS los usuarios
export const getUsers = async (req, res) => {
  try {
    const usuarios = await getAllUsers();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({ message: 'Error al obtener la lista de usuarios' });
  }
};

// Obtengo usuario por ID
export const getUserByIdController = async (req, res) => {
  try {
    const usuario = await getUserById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return res.status(500).json({ message: 'Error al obtener usuario por ID' });
  }
};


// Creo nuevo usuario
export const registerUser = async (req, res) => {
  try {
    const nuevoUsuario = await addUser(req.body);
    return res.status(201).json({ message: 'Usuario creado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

// Actualizo usuario por ID
export const updateUserController = async (req, res) => {
  try {
    const usuario = await updateUser(req.params.id, req.body);
    return res.status(200).json({ message: 'Usuario actualizado correctamente', usuario });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

// Elimino usuario por ID
export const deleteUserController = async (req, res) => {
  try {
    const resultado = await deleteUser(req.params.id);
    return res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};


export {
  login,
  registerUser,
  getUsers,
  getUserByIdController,
  updateUserController,
  deleteUserController
};
