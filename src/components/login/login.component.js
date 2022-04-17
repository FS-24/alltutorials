import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from "../form/form.component";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../..";
// Initialize Firebase Authentication and get a reference to the service

export function Login() {
  const [status, setStatus] = useState({ code: "", message: "" });
  let navigate = useNavigate();
  let auth = useAuth();

  useEffect(() => {
    if (auth !== null) {
      navigate("/", { replace: true });
    }
  });

  function login(values) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // console.log(user);
        setStatus({ code: "201", message: "Successfull login" });
        navigate("/manageuser", { replace: true });
        return new Promise((resolve, reject) => {
          resolve("reset form");
        });
        // ...
      })
      .catch((error) => {
        setStatus({ code: error.code, message: error.message });
      });
  }

  return <Form onSubmit={login} title="Login" status={status} />;
}
