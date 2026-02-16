window.uploadProduct = async () => {
  const file = imageInput.files[0];
  if (!file || !nameInput.value || !categoryInput.value || !sizeInput.value || !colorInput.value || !priceInput.value) {
    alert("All fields are required!");
    return;
  }

  try {
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    await addDoc(collection(db, "products"), {
      name: nameInput.value,
      category: categoryInput.value,
      size: sizeInput.value,
      color: colorInput.value,
      price: Number(priceInput.value),
      imageUrl,
      createdAt: new Date()
    });

    alert("Product uploaded successfully!");

    // Clear form
    nameInput.value = "";
    categoryInput.value = "";
    sizeInput.value = "";
    colorInput.value = "";
    priceInput.value = "";
    imageInput.value = "";

  } catch (err) {
    alert("Upload failed: " + err.message);
  }
};