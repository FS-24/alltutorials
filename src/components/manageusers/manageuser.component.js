import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { Loading } from "../loading/loading.component";

export default function ManageUser(props) {
  // states
  const [users, setUsers] = useState([]); //List of users
  const [didUpdate, setDidUpdate] = useState(false); // define when to refresh the list of users
  const [user, setUser] = useState({ name: "", email: "" }); // get the value from the form
  const [isValid, setIsvalid] = useState(false); // is true when the form is well filled
  const [editing, setEditing] = useState(false); // is true when the button update on the user liste table is clicked; it determines if the form is in editing
  const [oldId, setOldId] = useState(""); // get the old id of the user we want to modify

  /* useEffect Hook
     allow to refresh th list of users when the state of didUpdate Change
   */
  useEffect(() => {
    getUsers();
  }, [didUpdate]);

  async function addUser(user) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "users"), user);
    // console.log("Document written with ID: ", docRef.id);
  }

  /**
   * Get All the users of the firebase firestore database
   * return users
   */
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
    setDidUpdate(false);
  }
  /**
   * @param  {Event} e
   * save user and update user
   */
  function handleSubmit(e) {
    e.preventDefault();

    if (isValid) {
      if (editing) {
        updateUser(user);
        // console.log(user);
      } else {
        saveUser(user);
      }
      setUser({ name: "", email: "" });
      setDidUpdate(true);
      setIsvalid(false);
    }
  }

  function saveUser(user) {
    let id = Date.now()
      .toString()
      .concat(Math.random() * 1000);
    let newuser = {
      id: id,
      name: user.name,
      email: user.email,
      update: Timestamp.now(),
    };
    addUser(newuser);
  }

  async function updateUser(userUpdated) {
    const q = query(collection(db, "users"), where("id", "==", oldId));
    const querySnapshot = await getDocs(q);

    // To update age and favorite color:
    await updateDoc(querySnapshot.docs[0].ref, userUpdated);
    setEditing(false);
  }

  /**
   * @param  {User} user
   * get user from the clicked liste and set the state to fill the form
   */
  function handleUpdate(user) {
    setUser(user);
    setOldId(user.id);
    setEditing(true);
  }
  /**
   * @param  {id} id
   * get the id of the clicked user and select in the firestore collection the user and delete it
   */
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
          setDidUpdate(true);
          console.log("deleted");
        });
      } catch (error) {}
    } else {
      window.alert("suppression annuler");
    }
  }

  return (
    <div className="container m-auto border shadow rounded mt-5 p-3">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
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
              setIsvalid(
                user.name.trim().length > 0 && user.email.trim().length > 0
              );
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
              setIsvalid(
                user.name.trim().length > 0 && user.email.trim().length > 0
              );
            }}
            aria-describedby="emailHelp"
          />
        </div>
        {editing ? (
          <button type="submit" className="btn btn-info">
            Update
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
      </form>

      <hr />

      <table className="table table-bordered table-responsive mt-3">
        {users.length > 0 ? (
          <>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                return (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          // handleDelete(u.id);
                          handleUpdate(u);
                        }}
                        className="mx-3 btn btn-sm btn-info"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(u.id);
                        }}
                        className="ms-auto btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          <Loading />
        )}
      </table>
    </div>
  );
}
