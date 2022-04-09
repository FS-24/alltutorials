import { Outlet } from "react-router-dom";
import NavBar from "../navbar/navbar.component";

export function Layout() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
