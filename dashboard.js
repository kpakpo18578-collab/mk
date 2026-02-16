// ===== Firebase Imports =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, addDoc, collection } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyCCgGD66PPvjZMfo357A3rbthp08bUterc",
  authDomain: "ab-collections-5228c.firebaseapp.com",
  projectId: "ab-collections-5228c",
  storageBucket: "ab-collections-5228c.appspot.com",
  messagingSenderId: "585093695454",
  appId: "1:585093695454:web:f34b514ddd2fd90a73bf4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ===== DOM Elements =====
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginSection = document.getElementById("loginSection");
const uploadSection = document.getElementById("uploadSection");

const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const sizeInput = document.getElementById("size");
const colorInput = document.getElementById("color");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");

// ===== Login =====
window.login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    alert("Logged in successfully!");
  } catch (err) {
    alert("Login failed: " + err.message);
  }
};

// ===== Logout =====
window.logout = async () => {
  await signOut(auth);
};

// ===== Toggle UI based on auth state =====
onAuthStateChanged(auth, user => {
  loginSection.style.display = user ? "none" : "block";
  uploadSection.style.display = user ? "block" : "none";
});

// ===== Upload Product =====
window.uploadProduct = async () => {
  const file = imageInput.files[0];

  // Validate all fields
  if (!nameInput.value || !categoryInput.value || !sizeInput.value || 
      !colorInput.value || !priceInput.value || !file) {
    alert("All fields are required!");
    return;
  }

  try {
    // Upload image to Firebase Storage
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    // Add product to Firestore
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
    console.error(err);
  }
};