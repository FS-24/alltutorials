import React, { Component } from "react";
import ReactDOM from "react-dom/client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "sta",
    };
  }

  render() {
    return <h1>Hello {this.state.name}</h1>;
  }
}
ReactDOM.createRoot(document.querySelector("#container")).render(<App />);
