// src/models/product.model.js
import { db } from "../config/firebase.js";

const productCollection = db.collection("products");

export const getAllProducts = async () => {
  const snapshot = await productCollection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const docRef = productCollection.doc(id);
  const productDoc = await docRef.get();
  if (!productDoc.exists) return null;
  return { id: productDoc.id, ...productDoc.data() };
};

export const postProduct = async (product) => {
  const docRef = await productCollection.add(product);
  return { id: docRef.id, ...product };
};

export const deleteProductById = async (id) => {
  const docRef = productCollection.doc(id);
  await docRef.delete();
};

export const updateProductById = async (id, productData) => {
  const docRef = productCollection.doc(id);
  await docRef.update(productData);
  return { id, ...productData };
};
