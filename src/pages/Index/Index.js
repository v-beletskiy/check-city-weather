import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addCity, updateStoredCitiesWeather } from "../../actions/actions";
import { ActionType } from "../../actions/actionTypes";
import CityCard from "../../components/CityCard/CityCard";
import CurrentLocationWeather from "../../components/CurrentLocationWeather/CurrentLocationWeather";

const useStyles = makeStyles({
  main: {
    flexDirection: "column",
    maxWidth: 1170,
    margin: "0 auto",
    padding: "0 30px",
  },
  enterCityContainer: {
    marginBottom: 30,
  },
  cityNameInput: {
    maxWidth: "400px",
    paddingRight: 10,
  },
  citiesContainer: {
    flexWrap: "wrap",
  },
  errorModalContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    width: "unset",
    padding: "20px 30px",
    backgroundColor: "#fff",
    borderRadius: 3,
    outline: "none",
  },
});

function Index() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.app.cities);
  const addCityError = useSelector((state) => state.app.addCityError);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    if (!addCityError) {
      setCityName("");
    }
  }, [addCityError]);

  useEffect(() => {
    const cityNames = cities.map((city) => city.cityName);
    if (cityNames.length) {
      dispatch(updateStoredCitiesWeather(cityNames));
    }
  }, []);

  const handleChangeCityName = (e) => {
    const cityName = e.target.value;
    setCityName(cityName);
  };

  const closeErrorModal = () => {
    dispatch({
      type: ActionType.ADD_CITY_ERROR,
      payload: false,
    });
  };

  return (
    <Grid container className={classes.main}>
      <CurrentLocationWeather />
      <Grid container className={classes.enterCityContainer}>
        <TextField
          value={cityName}
          onChange={handleChangeCityName}
          label="Please, enter city name"
          variant="outlined"
          color="secondary"
          size="small"
          className={classes.cityNameInput}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(addCity(cityName))}
          disabled={!cityName.length}
        >
          Go!
        </Button>
      </Grid>
      <Modal open={addCityError} onClose={closeErrorModal}>
        <Grid container className={classes.errorModalContainer}>
          <Typography color="secondary">
            Incorrect city name. Please, try again.
          </Typography>
        </Grid>
      </Modal>
      {cities ? (
        <Grid container className={classes.citiesContainer}>
          {cities.map((city) => {
            return <CityCard key={city.cityName} city={city} />;
          })}
        </Grid>
      ) : null}
    </Grid>
  );
}

export default Index;
