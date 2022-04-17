import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ManageUser from "./components/manageusers/manageuser.component";
import { NavBar } from "./components/navbar/navbar.component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home.component";
import { Login } from "./components/login/login.component";
import { RegisterUser } from "./components/register/register.component";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { NotFound } from "./pages/notfound.component";
import { About } from "./pages/about.component";
import { RequireAuth } from "./components/requireauth/requireauth.component";
const auth = getAuth();

const AuthContext = createContext(null);

function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [cUser, setCUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCUser(user);

        // ...
      } else {
        setCUser(null);
      }
    });
  }, []);

  return (
    <div>
      <AuthContext.Provider value={cUser}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="manageuser"
            element={
              <RequireAuth>
                <ManageUser />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterUser />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}
ReactDOM.createRoot(document.querySelector("#container")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export { App, useAuth };
