import React, { Component } from "react";
import DeviceTable from "../deviceTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: "",
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

  render() {
    return (
      <React.Fragment>
        <DeviceTable />
        <ButtonGroup>
          <Button
            color="secondary"
            style={{ marginTop: 10 }}
            onClick={this.handleRefresh}
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
