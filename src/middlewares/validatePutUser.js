export const validatePutUser = (req, res, next) => {
  const { nombre, email, password, rol } = req.body;

  // Validar campos vacíos
  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios para actualizar: nombre, email, password y rol"
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "El email no tiene un formato válido" });
  }

  // Validar longitud de contraseña
  if (password.length < 6) {
    return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  // Validar rol permitido
  const rolesPermitidos = ['admin', 'cliente', 'viewer'];
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({ message: "El rol debe ser 'admin', 'cliente' o 'viewer'" });
  }

  next();
};
