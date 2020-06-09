import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentCityWeather } from "../../actions/actions";
import CityCard from "../CityCard/CityCard";

const useStyles = makeStyles((theme) => ({
  currentLocationContainer: {
    flexDirection: "column",
    marginBottom: 40,
    cursor: "none",
    pointerEvents: "none",
    "& div": {
      maxWidth: 300,
    },
  },
  currentLocationHeader: {
    color: theme.palette.text.main,
  },
  currentLocationError: {
    marginBottom: 40,
    color: theme.palette.error.main,
  },
}));

const getCurrentCoords = (setCurrentCoordsError, dispatch) => {
  const success = (res) => {
    const coords = {
      lat: res.coords.latitude,
      lng: res.coords.longitude,
    };
    dispatch(getCurrentCityWeather(coords));
  };
  const error = () => {
    setCurrentCoordsError(true);
  };
  navigator.geolocation.getCurrentPosition(success, error);
};

function CurrentLocationWeather() {
  const classes = useStyles();
  const [currentCoordsError, setCurrentCoordsError] = useState(false);
  const dispatch = useDispatch();
  const currentCity = useSelector((state) => state.app.currentCity);

  useEffect(() => {
    getCurrentCoords(setCurrentCoordsError, dispatch);
  }, []);

  useEffect(() => {
    let resetErrorMessageID;
    if (currentCoordsError) {
      resetErrorMessageID = setTimeout(
        () => setCurrentCoordsError(false),
        5000
      );
    }
    return () => {
      clearTimeout(resetErrorMessageID);
    };
  }, [currentCoordsError]);

  return (
    <>
      {Object.keys(currentCity).length ? (
        <Grid container className={classes.currentLocationContainer}>
          <Typography className={classes.currentLocationHeader}>
            Your current location weather:
          </Typography>
          <CityCard city={currentCity} disableControls />
        </Grid>
      ) : null}
      {currentCoordsError ? (
        <Typography className={classes.currentLocationError}>
          Are you really afraid of your current location being hacked?)))
        </Typography>
      ) : null}
    </>
  );
}

export default CurrentLocationWeather;
