import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import * as deviceNames from "../../data/device-names.json";
import * as deviceList from "../../data/device-list.json";
import check from "./check.jpeg";

var request = require('request');
const EDIT_NAME_PATH = "http://localhost:5000/updatename";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DeviceTable(props) {
  const classes = useStyles();
  
  const updateName = (newName, macToUpdate) => {
    let nameObj = new Object()
    nameObj.name = newName;
    nameObj.mac = macToUpdate;
    var options = {
      uri: EDIT_NAME_PATH,
      body: nameObj,
      method: 'POST',
      headers: {
          'Accept': "*/*",
          'Content-Type': 'application/json'
      },
      json: true
    }
    request(options, function (error, response) {
        console.log(error,response);
        return;
    });
  }

  let names = props.names;
  let devs = props.devices;
  let macs = Object.keys(devs);
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="left">OS Type&nbsp;</TableCell>
              <TableCell align="left">IP&nbsp;</TableCell>
              <TableCell align="left">Vendor&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {macs.map((mac) => (
              <TableRow key={mac}>
                <TableCell component="th" scope="row">
                  <TextField
                    style={{ width: "300px" }}
                    id="outlined-required"
                    defaultValue={names[mac]}
                    onChange={(e) => {
                      updateName(e.target.value, mac);
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  <img src={check} style={{ width: "30px" }} />
                </TableCell>
                <TableCell align="left">{devs[mac].product}</TableCell>
                <TableCell align="left">{devs[mac].ostype}</TableCell>
                <TableCell align="left">{devs[mac].ip}</TableCell>
                <TableCell align="left">{devs[mac].vendor}</TableCell>
                <TableCell align="left">
                  {
                    <span
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      View Traffic
                    </span>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
