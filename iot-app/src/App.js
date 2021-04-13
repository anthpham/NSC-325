import React, { Component } from "react";
import DeviceTable from "./components/deviceTable";
import logo from "./SafeTNet.png";
import "./App.css";

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
        <DeviceTable />
      </div>
    );
  }
}

export default App;
