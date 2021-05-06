import React, { Component } from "react";
import DeviceTable from "../deviceTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Modal from "@material-ui/core/Modal";
import Traffic from "./traffic";

const NAMES_PATH = "http://localhost:5000/names";
const DEVICES_PATH = "http://localhost:5000/devices";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      names: [],
      devices: [],
      trafficOpen: false,
    };
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      this.getNames();
      this.getDevices();
    } 
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
    fetch(DEVICES_PATH, {
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
        <DeviceTable names={this.state.names} devices={this.state.devices}/>
        <ButtonGroup>
          <Button
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={this.handleOpen}
          >
            Refresh
          </Button>
        </ButtonGroup>
      </React.Fragment>
    );
  }
}

export default DashBoard;
