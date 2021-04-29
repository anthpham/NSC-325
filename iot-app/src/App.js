import React, { Component } from "react";
import logo from "./SafeTNet.png";
import "./App.css";
import DashBoard from "./components/pages/dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>My Dashboard</h2>
        </div>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <DashBoard />
      </div>
    );
  }
}

export default App;
