import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import productsRoutes from './routes/products.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

// Esto carga las variables del archivo .env
dotenv.config();

// instancio la app
const app = express();

// habilito cors
app.use(cors());

// interpreta los body en formato JSON
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Montamos las rutas bajo el prefijo '/api'
app.use('/api', productsRoutes);
app.use('/usuarios', userRoutes);
app.use('/auth', authRoutes);

// Middleware para errores de body mal formado (ej: JSON inválido)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Error de formato en el JSON recibido' });
  }
  next();
});


// Middleware para manejar rutas no definidas (404)
app.use((req, res) => {
  res.status(404).json({ message: 'La ruta NO se encontró.' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});



