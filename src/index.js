import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/navbar.component";
import { About } from "./pages/about/about.components";
import { Home } from "./pages/home/home.component";
import { NotFound } from "./pages/notfound/noutfound.component";
import { UserDetail } from "./pages/users/userdetails.component";
import { Users } from "./pages/users/users.components";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.querySelector("#container")).render(
  <Router>
    <App className="container" />
  </Router>
);
