import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function Addition() {
  const [values, setValues] = useState([0, 0]);

  const [somme, setsomme] = useState(0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setsomme(values[0] + values[1]);
      }}
    >
      <input
        type="number"
        name="value1"
        value={values[0]}
        placeholder="Enter first value"
        onChange={(e) => {
          setValues([Number(e.target.value), values[1]]);
        }}
      />
      +
      <input
        type="number"
        name="value2"
        value={values[1]}
        placeholder="Enter Second value"
        onChange={(e) => {
          setValues([values[0], Number(e.target.value)]);
        }}
      />
      <span>La somme est : {somme} </span>
      <div>
        <input type="submit" value="Calculer" />
      </div>
    </form>
  );
}

ReactDOM.createRoot(document.querySelector("#container")).render(<Addition />);
