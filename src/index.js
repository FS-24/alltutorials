import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection, doc, addDoc } from "firebase/firestore";
import { Config } from "./.env";

// init firebase
const firebaseApp = initializeApp(Config.firebase);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);
const data = {
  firstName: "kodjo",
  lastName: "edem",
  born: 1889,
};
const products = collection(db, "product");
async function setdata() {
  try {
    const docRef = await addDoc(collection(db, "users"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// setdata();

async function getdata() {
  const querySnapshot = await getDocs(collection(db, "users"));
  let usertable = querySnapshot.map((doc) => {
    return {
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      born: doc.data().born,
    };
    // console.log(`${doc.id} => ${doc.data().first}`);
    console.log(usertable);
  });
}

// getdata();

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "users")).then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => {
          return {
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            born: doc.data().born,
          };
        })
      );
    });
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        users.map((user) => {
          return (
            <>
              <h1>{user.lastName} </h1>
              <h3>{user.firstName} </h3>
              <em>{user.born} </em>
            </>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
// const element = <h1>Hello Ablam</h1>;
ReactDOM.createRoot(document.querySelector("#container")).render(<App />);
