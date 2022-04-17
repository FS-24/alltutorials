import { useEffect, useState } from "react";

export function Form(props) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ code: "", message: "" });

  useEffect(() => {
    setStatus(props.status);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (values.email.trim().length > 0 && values.password.trim().length > 0) {
      props.onSubmit(values).then(setValues({ email: "", password: "" }));
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column m-auto"
      style={{ height: "90vh" }}
    >
      {status.message.length > 0 ? (
        <div
          className={
            status.code === "201" ? "alert alert-success" : "alert alert-danger"
          }
          role="alert"
        >
          {status.message}
        </div>
      ) : (
        <></>
      )}

      <div className="card" style={{ width: "20rem" }}>
        <div className="card-body">
          <h2 className="card-title text-center">{props.title}</h2>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={values.email}
                onChange={(e) => {
                  setValues({
                    email: e.target.value,
                    password: values.password,
                  });
                }}
                aria-describedby="emailHelp"
                autoComplete="off"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                className="form-control"
                onChange={(e) => {
                  setValues({
                    email: values.email,
                    password: e.target.value,
                  });
                }}
                id="password"
                autoComplete="off"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
