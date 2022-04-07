import React from "react";
import ReactDOM from "react-dom/client";

// https/jckinter.com/wp-content/uploads/2020/12/bistella-300f.jpg
let categorie = {
  type: "solid",
  nom: "biscuit",
  image:
    "https://img.cuisineaz.com/680x357/2015/09/02/i46914-meilleurs-biscuits-sucres-faits-maison.jpg",
};

let produit = {
  nom: "bistella",
  image: "https://jckinter.com/wp-content/uploads/2020/12/bistella-300f.jpg",
  qte: 200,
  categorie: categorie,
  promotion: false,
};

function Avatar(arg) {
  return (
    <div>
      <img src={arg.image} width="200px" alt="biscuit de mer" />
      <h1>Nom : {arg.nom}</h1>
    </div>
  );
}

function Categorie() {
  return (
    <div>
      <h1>Catégorie</h1>
      <Avatar nom={categorie.nom} image={categorie.image} />
      <h4>Type : {categorie.type}</h4>
    </div>
  );
}

function Expo(props) {
  return (
    <div>
      <Avatar nom={props.produit.nom} image={props.produit.image} />
      <h2>Qte : {props.produit.qte}</h2>
      <Categorie />
      <h2>En promotion {props.produit.promotion ? "oui" : "non"}</h2>
    </div>
  );
}

function App() {
  return (
    <div>
      <Categorie />
      <Expo produit={produit} />
    </div>
  );
}

ReactDOM.createRoot(document.querySelector("#container")).render(<App />);
