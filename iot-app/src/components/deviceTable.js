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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, status, calories, fat, carbs, protein) {
  return { name, status, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "Alexa",
    "Secure",
    "Echo",
    "Linux Debian",
    "192.168.0.100",
    "Amazon"
  ),
  createData(
    "Living Room Lamp",
    "Secure",
    "Phillips Hue",
    "Ubuntu",
    "192.168.0.103",
    "Phillips"
  ),
  createData(
    "Coffee Maker",
    "Secure",
    "Smart Outlet",
    "WemOS",
    "192.168.0.104",
    "Wemo"
  ),
  createData(
    "Gameroom TV",
    "Secure",
    "Roku",
    "Cali Linux",
    "192.168.0.108",
    "TLC"
  ),
  createData(
    "Kitchen Cast",
    "Secure",
    "Chromecast",
    "Android 5.2",
    "192.168.0.101",
    "Google"
  ),
];

export default function DeviceTable() {
  const classes = useStyles();
  console.log("here2");
  console.log(deviceList);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <TextField
                  style={{ width: "300px" }}
                  id="outlined-required"
                  defaultValue={row.name}
                />
              </TableCell>
              <TableCell align="left">
                <img src={check} style={{ width: "30px" }} />
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
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
  );
}
