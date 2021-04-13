import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Alexa", "Echo", "Linux Debian", "ngix", "Amazon"),
  createData("Living Room Lamp", "Phillips Hue", "Ubuntu", "ngix", "Phillips"),
  createData("Coffee Maker", "Smart Outlet", "WemOS", "ngix", "Wemo"),
  createData("Gameroom TV", "Roku", "Cali Linux", "ngix", "TLC"),
  createData("Kitchen Cast", "Chromecast", "Android 5.2", "ngix", "Google"),
];

export default function DeviceTable() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">OS Type&nbsp;</TableCell>
            <TableCell align="right">CPE&nbsp;</TableCell>
            <TableCell align="right">Vendor&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
