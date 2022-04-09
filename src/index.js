import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">React</Link>
          </li>
          <li>
            <Link to="/docs">Docs</Link>
          </li>
          <li>
            <Link to="/tutorial">Tuto</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <div>Home</div>;
}
function Docs() {
  return <div>Documentation</div>;
}
function Tutorial() {
  return <div>Tutorial</div>;
}
function Blog() {
  return <div>Blog</div>;
}

function NotFound() {
  return <div> 404 Not found</div>;
}

ReactDOM.createRoot(document.querySelector("#container")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
