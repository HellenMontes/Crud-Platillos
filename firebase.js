  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc,onSnapshot,  doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYMErg974YbHLvJWr9XJROWI2xWlx32T0",
    authDomain: "pruebatecnica-ef21b.firebaseapp.com",
    projectId: "pruebatecnica-ef21b",
    storageBucket: "pruebatecnica-ef21b.appspot.com",
    messagingSenderId: "921734940733",
    appId: "1:921734940733:web:924aba1a7026f2abe50254"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/*Exportacion de constantes para*/
export const Guardar = (title, description, preci, ingredient,categori) =>{
    addDoc(collection(db, 'platillos'),{title, description, preci, ingredient, categori});
}
export const onGetTasks = () => console.log('onGetTasks')
export {
    onSnapshot, collection, db
}

export const Borrar = id => deleteDoc(doc(db, 'platillos', id));
export const mostrar = id => getDoc(doc(db, 'platillos', id));
export const guardarCambios = (id, newFields) => updateDoc(doc(db, 'platillos', id), newFields);