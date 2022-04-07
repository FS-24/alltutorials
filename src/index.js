import React from "react";
import ReactDOM from "react-dom/client";

// https/jckinter.com/wp-content/uploads/2020/12/bistella-300f.jpg

let produit = {
  nom: "bistella",
  image: "https://jckinter.com/wp-content/uploads/2020/12/bistella-300f.jpg",
  qte: 200,
  categorie: "biscuit",
  promotion: false,
};

function Expo(props) {
  return (
    <div>
      <img src={props.produit.image} width="200px" alt="biscuit" />
      <h1>Nom : {props.produit.nom}</h1>
      <h2>Qte : {props.produit.qte}</h2>
      <h2>Categorie : {props.produit.categorie}</h2>
      <h2>En promotion {props.produit.promotion ? "oui" : "non"}</h2>
    </div>
  );
}

function App() {
  return <div></div>;
}

ReactDOM.createRoot(document.querySelector("#container")).render(
  <Expo produit={produit} />
);
