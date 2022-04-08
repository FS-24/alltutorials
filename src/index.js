import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);

  /* useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((respone) => respone.json())
      .then((data) => {
        setTodos(data);
      });
  }, []); */

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });

  return (
    <ul>
      {todos.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
}

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({
    text: "I never see what has been done; I only see what remains to be done.",
    author: "Marie Curie",
  });
  const [loading, setLoading] = useState(true);

  function getRandomQuote() {
    let rand = Math.floor(Math.random() * quotes.length);
    // console.log(quotes[rand]);
    setQuote(quotes[rand]);
  }

  useEffect(() => {
    axios.get("https://type.fit/api/quotes").then((response) => {
      if (response.data.length > 0) {
        // console.log(response.data);
        setLoading(false);
        setQuotes(response.data);
      }
    });
  }, []);

  return loading ? (
    <h2>Chargement...</h2>
  ) : (
    <div>
      <h3> {quote.text} </h3>
      <p>
        <em> {quote.author} </em>
      </p>
      <button onClick={getRandomQuote}>Generate New Quote</button>
    </div>
  );
}

ReactDOM.createRoot(document.querySelector("#container")).render(<Quotes />);
