import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../..";

function Login() {
  let navigate = useNavigate();

  return (
    <>
      <button
        className="btn btn-secondary btn-md rounded mx-2"
        onClick={() => {
          navigate("login");
        }}
      >
        Login
      </button>
      <button
        className="btn btn-dark btn-md rounded  mx-2"
        onClick={() => {
          navigate("register");
        }}
      >
        Register
      </button>
    </>
  );
}

function Logout() {
  let navigate = useNavigate();
  let auth = useAuth();

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <>
      <span>{auth?.email}</span>
      <button className="btn btn-danger btn-md rounded mx-2" onClick={logout}>
        Logout
      </button>
    </>
  );
}

export function NavBar() {
  let auth = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          FS-24
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/manageuser">
                Manage Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <span className="navbar-text">
            {auth == null ? <Login /> : <Logout email={auth.email} />}
          </span>
        </div>
      </div>
    </nav>
  );
}
