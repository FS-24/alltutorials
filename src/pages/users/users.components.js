import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export function Users() {
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="row">
      {users.map((user) => {
        return (
          <div key={user.id} className="col-lg-3 col-md-4 col-sm-12 g-2">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={`https://i.pravatar.cc/180?img=${user.id}`}
                className="card-img-top"
                alt={user.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{user.name}</h5>
                <div>
                  <em>{user.email}</em>
                </div>

                {/* <Link to={`/users/details/${user.id}`}>Details</Link> */}

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate(`/users/${user.id}`);
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
