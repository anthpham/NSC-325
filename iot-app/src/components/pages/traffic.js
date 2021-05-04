import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 6rem;
  margin-right: 6rem;
  margin-top: 8rem;
  padding-top: 2rem;
  height: 70%;
  text-alogn: center;
  background: #ffffff;
`;

class Traffic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trafficData: [],
      deviceName: props.name,
      mac: props.mac,
      ip: props.ip,
    };
  }

  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "center" }}>{this.state.deviceName}</h1>
        <div class="row">
          <div
            class="column"
            style={{ textAlign: "center", float: "left", width: "50%" }}
          >
            <h4>{this.state.mac}</h4>
          </div>
          <div
            class="column"
            style={{ textAlign: "center", float: "right", width: "50%" }}
          >
            <h4>{this.state.ip}</h4>
          </div>
        </div>
      </Container>
    );
  }
}

export default Traffic;
