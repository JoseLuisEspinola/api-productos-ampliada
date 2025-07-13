// src/controllers/product.controller.js
import productService from "../services/product.service.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAll();
        res.status(200).json({ message: "Lista de productos", payload: products });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getById(id);
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });

        res.status(200).json({ message: "Producto encontrado", payload: product });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const postProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, stock, disponible } = req.body;

        if (!nombre || !descripcion || !precio || stock === undefined) {
            return res.status(400).json({ message: "Faltan campos obligatorios PRODUCTS.CONTROLLER.JS: nombre, descripcion, precio y stock"
            });
        }

        const newProduct = {
            nombre,
            descripcion,
            precio: +precio,
            stock: +stock,
            disponible: disponible ?? false,
        };
        const postProduct = await productService.createProduct(newProduct);
        res.status(201).json({ message: "Producto creado", payload: postProduct });

      } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
      }
};

//console.log("Exportando deleteProduct correctamente");
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.removeById(id);
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        const updated = await productService.updateById(id, productData);

        res.status(200).json({ message: "Producto actualizado", payload: updated });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error: error.message });
    }
};

//console.log("deleteProduct está exportado");

export default { getAllProducts, getProductById, postProduct, deleteProduct, updateProduct };
