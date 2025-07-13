// src/services/product.service.js
import {
  getAllProducts,
  getProductById,
  postProduct,
  deleteProductById,
  updateProductById,
} from "../models/product.model.js";

const getAll = () => getAllProducts();
const getById = (id) => getProductById(id);
const createProduct = (product) => postProduct(product);
const removeById = (id) => deleteProductById(id);
const updateById = (id, product) => updateProductById(id, product);

export default {
  getAll,
  getById,
  createProduct,
  removeById,
  updateById,
};
