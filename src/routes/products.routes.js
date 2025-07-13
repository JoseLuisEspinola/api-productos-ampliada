import { Router } from 'express';
import productController from '../controllers/products.controller.js';
import { validatePostProduct } from '../middlewares/validatePostProduct.js';
import { validatePutProduct  } from '../middlewares/validatePutProduct.js';

const router = Router();

// Obtener todos los productos
router.get('/products', productController.getAllProducts);

// Obtener un producto por ID
router.get('/products/:id', productController.getProductById);

// Crear un nuevo producto con validación previa
router.post('/products/create', validatePostProduct, productController.postProduct);

// Actualizar producto
router.put('/products/:id', validatePutProduct,productController.updateProduct);

// Eliminar producto
router.delete('/products/:id', productController.deleteProduct);

export default router;
