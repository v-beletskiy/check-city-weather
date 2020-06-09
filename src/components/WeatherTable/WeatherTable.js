import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import { weatherParamsCorrespondingName } from "../../data/data";

const useStyles = makeStyles((theme) => ({
  tableHead: {
    backgroundColor: theme.palette.secondary.main,
    "& th": {
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.text.contrast,
    },
  },
  tableRow: {
    color: theme.palette.text.main,
    "&:nth-child(2n)": {
      backgroundColor: theme.palette.background.main,
    },
  },
  tableCell: {
    width: "50%",
  },
}));

const renderWeatherParamValue = (val) => {
  if (typeof val === "boolean") {
    return val ? "+" : "-";
  } else {
    return val;
  }
};

function WeatherTable(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Card}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableCell}>
              Weather parameter
            </TableCell>
            <TableCell className={classes.tableCell} align="left">
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map((item) => (
            <TableRow key={item} className={classes.tableRow}>
              <TableCell>{weatherParamsCorrespondingName[item]}</TableCell>
              <TableCell align="left">
                {renderWeatherParamValue(data[item])}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WeatherTable;

WeatherTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
};
