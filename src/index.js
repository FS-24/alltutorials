import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore/lite";
import "bootstrap/dist/css/bootstrap.min.css";

// Your web app's Firebase configuration
// htmlFor Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_Po5pufX5t3lREZ52oPuC0Tle2Acxjww",
  authDomain: "usersmangementreact.firebaseapp.com",
  projectId: "usersmangementreact",
  storageBucket: "usersmangementreact.appspot.com",
  messagingSenderId: "948310553292",
  appId: "1:948310553292:web:1c129524adf2ea8e5b4869",
  measurementId: "G-0H45XEL6RL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addUser(user) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "users"), user);
  console.log("Document written with ID: ", docRef.id);
}

function App() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  function handleSubmit(e) {
    e.preventDefault();
    let id = new Date().toUTCString().concat(Math.random() * 1000);
    if (user.name.trim().length > 0 && user.email.trim().length > 0) {
      // setUsers([...users, user]);
      let newuser = {
        id: id,
        name: user.name,
        email: user.email,
        update: Timestamp.now(),
      };
      addUser(newuser);
      setUser({ name: "", email: "" });
    }
    setUpdate(true);
    // getUsers();
  }

  async function getUsers() {
    const q = query(collection(db, "users"), orderBy("update", "desc"));
    const querySnapshot = await getDocs(q);
    let userList = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      userList.push(doc.data());
    });
    setUsers(userList);
    setUpdate(false);
  }

  async function handleDelete(id) {
    if (window.confirm("Voulez vous vraiment suppimer???")) {
      const q = query(collection(db, "users"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      let docId;
      try {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docId = doc.id;
        });

        deleteDoc(doc(db, "users", docId)).then(() => {
          setUpdate(true);
          console.log("deleted");
        });
      } catch (error) {}
    } else {
      window.alert("suppression annuler");
    }
  }

  useEffect(() => {
    getUsers();
  }, [update]);

  return (
    <div className="container m-auto border shadow rounded mt-5 p-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            className="form-control"
            onChange={(e) => {
              setUser({ name: e.target.value, email: user.email });
            }}
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => {
              setUser({ name: user.name, email: e.target.value });
            }}
            aria-describedby="emailHelp"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className="mt-3">
        <ul className="list-group list-group">
          {users.map((u) => {
            return (
              <li key={u.id} className="list-group-item">
                <span className="d-flex justify-between">
                  name: {u.name} email: {u.email}
                  <button
                    onClick={() => {
                      handleDelete(u.id);
                    }}
                    className="ms-auto btn btn-sm btn-danger"
                  >
                    X
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.querySelector("#container")).render(<App />);
