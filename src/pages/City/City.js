import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TemperatureWidget from "../../components/TemperatureWidget/TemperatureWidget";
import WeatherTable from "../../components/WeatherTable/WeatherTable";
import Utils from "../../utils/utils";
import appUtils from "../../utils/appUtils";

const useStyles = makeStyles({
  cityContainer: {
    flexDirection: "column",
    maxWidth: 1170,
    margin: "0 auto",
    padding: "0 30px",
  },
  cityWeatherParamsContainer: {
    marginBottom: 70,
  },
  cityName: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 20,
  },
});

function City() {
  const pathname = window.location.pathname;
  const lastSlugPart = Utils.getLastSLugPart(pathname);
  const classes = useStyles();
  const hourlyCityTemp = useSelector((state) => state.app.hourlyCityTemp);
  const city = useSelector((state) =>
    state.app.cities.filter((city) => city.cityName === lastSlugPart)
  );
  const weatherParams = city.length ? city[0].weatherParams : {};
  const cityName = city.length ? city[0].cityName : city.cityName;

  return (
    <Grid container className={classes.cityContainer}>
      <Grid container className={classes.cityWeatherParamsContainer}>
        <Typography color="primary" className={classes.cityName}>
          {appUtils.transformCityNameToSearch(cityName)}
        </Typography>
        <WeatherTable data={weatherParams} />
      </Grid>
      <TemperatureWidget
        data={hourlyCityTemp}
        itemHeight={20}
        stepHeight={10}
      />
    </Grid>
  );
}

export default City;
