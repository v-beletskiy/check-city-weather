import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { ReactComponent as WeatherAppIcon } from "../../assets/icons/weather_app.svg";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    padding: "20px 100px 50px",
    [theme.breakpoints.down(768)]: {
      paddingLeft: 30,
      paddingRight: 30,
    },
  },
  headerText: {
    fontSize: 22,
    fontWeight: 700,
  },
  icon: {
    display: "block",
    width: 35,
    height: 35,
    paddingRight: 20,
    cursor: "pointer",
  },
}));

function Header(props) {
  const { className } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <header className={`${classes.header} ${className}`}>
      <WeatherAppIcon
        className={classes.icon}
        onClick={() => history.push("/")}
      />
      <Typography color="primary" className={classes.headerText}>
        City Weather
      </Typography>
    </header>
  );
}

export default Header;

Header.propTypes = {
  className: PropTypes.string,
};
