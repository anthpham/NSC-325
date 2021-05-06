import React, { Component } from "react";
import DeviceTable from "../deviceTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Modal from "@material-ui/core/Modal";
import Traffic from "./traffic";

const NAMES_PATH = "http://localhost:5000/names";
const DEVICES_PATH = "http://localhost:5000/devices";
const DEVICES_PATH_2 = "http://localhost:5000/devices2";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      names: [],
      devices: [],
      trafficOpen: false,
      refreshed: false,
    };
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.getNames();
      this.getDevices();
    } 
  }

  handleRefresh = () => {
    let newNames = this.state.names;
    let newDevices = this.state.devices;
    let hue = {
      "ip": "192.168.0.100",
      "name": "http",
      "product": "nginx",
      "ostype": "linux 3.12",
      "cpe": "cpe:/a:igor_sysoev:nginx",
      "vendor": "Philips Lighting BV"
    };
    newDevices["00:17:88:24:8E:2A"] = hue;
    newNames["00:17:88:24:8E:2A"] = "NEW DEVICE FOUND";
    this.setState({refreshed: true, names: newNames, devices: newDevices});
    
  }

  getNames = () => {
    fetch(NAMES_PATH, {
      method: "GET",
      headers: {
        'Accept': "*/*"
      },
    })
    .then((res) => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          names: result,
        });
      },
      (error) => {
        console.log("ERROR getting data");
        console.log(error);
        this.setState({
          isLoaded: true,
        });
      }
    );
  }

  getDevices = () => {
    fetch(this.state.refreshed ? DEVICES_PATH_2 : DEVICES_PATH, {
      method: "GET",
      headers: {
        'Accept': "*/*"
      },
    })
    .then((res) => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          devices: result,
        });
      },
      (error) => {
        console.log("ERROR getting data");
        console.log(error);
        this.setState({
          isLoaded: true,
        });
      }
    );
  }

  handleOpen = () => {
    this.setState({ trafficOpen: true });
  };

  handleClose = () => {
    this.setState({ trafficOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          open={this.state.trafficOpen}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Traffic
            name={"Roku"}
            mac={"8f:43:44:1a:bc:09"}
            ip={"192.168.0.103"}
          />
        </Modal>
        {!this.state.refreshed && <DeviceTable names={this.state.names} devices={this.state.devices}/>}
        {this.state.refreshed && <DeviceTable names={this.state.names} devices={this.state.devices}/>}
        <ButtonGroup>
          <Button
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={this.handleRefresh}
          >
            Refresh
          </Button>
        </ButtonGroup>
      </React.Fragment>
    );
  }
}

export default DashBoard;
