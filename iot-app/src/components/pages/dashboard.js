import React, { Component } from "react";
import DeviceTable from "../deviceTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Modal from "@material-ui/core/Modal";
import Traffic from "./traffic";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: "",
      trafficOpen: false,
    };
  }
  handleRefresh = () => {
    fetch("http://localhost:5000/", {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    })
      .then((res) => res.text())
      // .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.replaceAll("'", '"'),
            // data: result.items,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

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
        <DeviceTable />
        <ButtonGroup>
          <Button
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={this.handleOpen}
          >
            Refresh
          </Button>
        </ButtonGroup>

        {this.state.isLoaded && (
          <div align="left" style={{ marginLeft: "250px" }}>
            <pre>{JSON.stringify(JSON.parse(this.state.data), null, 1)}</pre>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default DashBoard;
