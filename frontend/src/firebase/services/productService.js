
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const productCollection = collection(db, "products");


// GET ALL PRODUCTS
export const getProducts = async () => {
  const snapshot = await getDocs(productCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


// GET SINGLE PRODUCT
export const getProductById = async (id) => {
  const productRef = doc(db, "products", id);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() };
  } else {
    throw new Error("Product not found");
  }
};


// ADD PRODUCT (Admin)
export const addProduct = async (productData) => {
  const docRef = await addDoc(productCollection, productData);
  return docRef.id;
};


// UPDATE PRODUCT (Admin)
export const updateProduct = async (id, updatedData) => {
  const productRef = doc(db, "products", id);
  await updateDoc(productRef, updatedData);
};


// DELETE PRODUCT (Admin)
export const deleteProduct = async (id) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
};