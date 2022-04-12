import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJuwOy8WH6OsnLCoUiuQnefsBqnP9I_CM",
  authDomain: "fir-reactapp-17de5.firebaseapp.com",
  projectId: "fir-reactapp-17de5",
  storageBucket: "fir-reactapp-17de5.appspot.com",
  messagingSenderId: "552383942457",
  appId: "1:552383942457:web:15b780cbf38258e71122e8",
  measurementId: "G-E3FMEQQPQ6",
};

// Initialize Firebase
const initApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(initApp);

// Add a new document in collection "cities"
async function setData() {
  // const cityRef = doc(db, "cities", "BJ");
  // await setDoc(cityRef, { capital: true }, { merge: true });

  const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
      a: 5,
      b: {
        nested: "foo",
      },
    },
  };

  let ref = doc(collection(db, "data"));
  await setDoc(ref, docData);
  console.log(ref);
}

async function addData() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function updateData() {
  const washingtonRef = doc(db, "cities", "LA");

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    name: "Los Angeless",
    timestamp: serverTimestamp(),
  });
}

async function deleteData() {
  await deleteDoc(doc(db, "cities", "BJ"));
}

async function deleteFieldData() {
  const cityRef = doc(db, "cities", "LA");

  // Remove the 'capital' field from the document
  await updateDoc(cityRef, {
    capital: deleteField(),
  });
}

async function deleteDocument() {
  await deleteDoc(doc(db, "cities", "LA"));
}

async function getData() {
  // const querySnapshot = await getDocs(collection(db, "users"));
  const q = query(collection(db, "users"), where("born", "<", 1818));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    let user = {
      first: doc.data().first,
      last: doc.data().last,
    };

    // console.log("Document ", doc.id, " => ", doc.data());
    console.log("user", user);
  });
}

// setData();
// updateData();
// deleteFieldData();
// deleteDocument();
getData();
const element = <h1>Hello Ablam</h1>;
ReactDOM.createRoot(document.querySelector("#container")).render(element);
