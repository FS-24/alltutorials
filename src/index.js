import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((respone) => respone.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <ul>
      {todos.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
}

ReactDOM.createRoot(document.querySelector("#container")).render(<Todo />);
