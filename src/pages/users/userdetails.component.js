import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function UserDetail(props) {
  let params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  return (
    <div className="card mx-auto" style={{ width: "20rem" }}>
      <img
        src={`https://i.pravatar.cc/180?img=${user.id}`}
        className="card-img-top"
        alt={user.name}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{user.name}</h5>
        <div>
          <h4>Email:</h4> <em>{user.email}</em>
          <p>Adress: {JSON.stringify(user.address)} </p>
        </div>
      </div>
    </div>
  );
}
