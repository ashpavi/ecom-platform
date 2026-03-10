import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadProductImages = async (files, productId) => {

  const urls = [];

  for (const file of files) {

    const imageRef = ref(
      storage,
      `products/${productId}/${Date.now()}-${file.name}`
    );

    await uploadBytes(imageRef, file);

    const url = await getDownloadURL(imageRef);

    urls.push(url);
  }

  return urls;
};