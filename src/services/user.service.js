import { db } from '../config/firebase.js';
import { Usuario } from '../models/user.model.js';

const usuariosRef = db.collection('usuarios');

// Obtengo todos los usuarios
const getAllUsers = async () => {
  const snapshot = await usuariosRef.get();
  const usuarios = [];
  snapshot.forEach(doc => {
    usuarios.push(new Usuario({ ...doc.data(), id: doc.id }));
  });
  return usuarios;
};


// Obtengo usuario por ID
const getUserById = async (id) => {
  const doc = await usuariosRef.doc(id).get();
  if (!doc.exists) {
    return null; // Se Puede manejar esto como 404 en el controlador
  }

  return new Usuario({ ...doc.data(), id: doc.id });
};


// Creo usuario
const addUser = async (datosUsuario) => {
  const nuevoUsuario = new Usuario(datosUsuario);
  const docRef = usuariosRef.doc(); // ID automático
  nuevoUsuario.id = docRef.id;
  await docRef.set({ ...nuevoUsuario });
  return nuevoUsuario;
};


// Actualizo usuario por ID
const updateUser = async (id, nuevosDatos) => {
  const docRef = usuariosRef.doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  const usuarioTemporal = new Usuario({ ...nuevosDatos, id });
  const datosLimpios = Object.fromEntries(
    Object.entries(usuarioTemporal).filter(([_, valor]) => valor !== undefined)
  );

  await docRef.update(datosLimpios);
  const actualizado = await docRef.get();
  return new Usuario({ ...actualizado.data(), id });
};


// Elimino usuario por ID
const deleteUser = async (id) => {
  await usuariosRef.doc(id).delete();
  return { message: `Usuario con ID ${id} eliminado correctamente` };
};


export {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};
