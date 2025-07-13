const validatePostProduct = (req, res, next) => {
  const { nombre, descripcion, precio, stock } = req.body;

  if (!nombre || !descripcion || !precio || stock === undefined) {
    return res.status(400).json({
      message: "Faltan campos obligatorios: nombre, descripcion, precio y stock"
    });
  }

  next(); // Todo en orden, continúa con el controlador
};

export { validatePostProduct };
