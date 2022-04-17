import { Form } from "../form/form.component";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../..";

export function RegisterUser(values) {
  const [status, setStatus] = useState({ code: "", message: "" });
  let navigate = useNavigate();
  let auth = useAuth();

  useEffect(() => {
    if (auth !== null) {
      navigate("/", { replace: true });
    }
  });

  function register(values) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
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

  return <Form onSubmit={register} status={status} title="Register" />;
}
