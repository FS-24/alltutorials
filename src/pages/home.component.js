import { useEffect } from "react";
import { useAuth } from "..";

export function Home() {
  let auth = useAuth();
  useEffect(() => {
    // console.log(auth);
  });

  return (
    <div>
      <h1>Home</h1>
      {auth?.email}
    </div>
  );
}
