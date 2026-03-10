import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadProductImages = async (files, productId) => {
  const urls = [];

  for (let i = 0; i < files.length; i++) {

    const file = files[i];

    const imageRef = ref(
      storage,
      `products/${productId}/${productId}-${i + 1}.jpg`
    );

    await uploadBytes(imageRef, file);

    const url = await getDownloadURL(imageRef);

    urls.push(url);
  }

  return urls;
};