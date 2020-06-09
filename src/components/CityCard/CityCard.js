import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import appUtils from "../../utils/appUtils";
import {
  deleteCity,
  refreshCityWeather,
  getHourlyCityTemperature,
} from "../../actions/actions";
import { ReactComponent as RainIcon } from "../../assets/icons/rain.svg";
import { ReactComponent as SnowIcon } from "../../assets/icons/snow.svg";
import { ReactComponent as WindIcon } from "../../assets/icons/wind.svg";
import { ReactComponent as TempIcon } from "../../assets/icons/temp.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { ReactComponent as CloudinessSunnyIcon } from "../../assets/icons/sunny.svg";
import { ReactComponent as CloudinessABitIcon } from "../../assets/icons/cloudy_a_bit.svg";
import { ReactComponent as CloudinessALotIcon } from "../../assets/icons/cloudy_a_lot.svg";
import { ReactComponent as CloudinessCloudy } from "../../assets/icons/cloudy.svg";

const useStyles = makeStyles((theme) => ({
  cityCard: {
    flexDirection: "column",
    maxWidth: "25%",
    padding: "15px 15px 50px",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.main,
    cursor: "pointer",
    transition: "all .2s",
    "&:hover": {
      backgroundColor: theme.palette.background.hover,
      boxShadow: "0px 0px 12px 3px rgba(0,0,0,0.1)",
      transform: "scale(1.05)",
      transition: "all .2s",
    },
    [theme.breakpoints.down(1280)]: {
      maxWidth: "unset",
    },
  },
  cityHeaderContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  cityNameContainer: {
    display: "flex",
    alignItems: "center",
    "& > svg": {
      width: 30,
      height: 30,
      paddingLeft: 15,
    },
  },
  cityName: {
    fontWeight: 700,
  },
  smallWeatherIcon: {
    display: "block",
    width: 35,
    height: 35,
  },
  bigWeatherIcon: {
    display: "block",
    width: 70,
    height: 70,
    paddingTop: 10,
  },
  controlIcon: {
    width: 15,
    height: 15,
    padding: "0 5px",
    "&:last-child": {
      paddingRight: 0,
    },
  },
  weatherParamContainer: {
    alignItems: "center",
    padding: "15px 0",
  },
  weatherParamValue: {
    paddingLeft: 30,
    fontSize: 20,
  },
}));

const getCloudinessIcon = (cloudiness) => {
  if (cloudiness <= 10) {
    return <CloudinessSunnyIcon />;
  } else if (cloudiness < 50) {
    return <CloudinessABitIcon />;
  } else if (cloudiness < 90) {
    return <CloudinessALotIcon />;
  } else {
    return <CloudinessCloudy />;
  }
};

function CityCard(props) {
  const { className, city, disableControls } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleNavigateToCity = () => {
    const cityName = city.cityName;
    dispatch(getHourlyCityTemperature(cityName));
  };

  const handleDeleteCity = (e) => {
    e.stopPropagation();
    dispatch(deleteCity(city.cityName));
  };

  const handleRefreshCityWeather = (e) => {
    e.stopPropagation();
    dispatch(refreshCityWeather(city.cityName));
  };

  return (
    <Grid
      container
      className={`${classes.cityCard} ${className}`}
      onClick={() => handleNavigateToCity()}
    >
      <Grid container className={classes.cityHeaderContainer}>
        <Grid className={classes.cityNameContainer}>
          <Typography color="primary" className={classes.cityName}>
            {appUtils.transformCityNameToSearch(city.cityName)}
          </Typography>
          {city.weatherParams.clouds !== null
            ? getCloudinessIcon(city.weatherParams.clouds)
            : null}
        </Grid>
        {!disableControls ? (
          <Grid>
            <RefreshIcon
              className={classes.controlIcon}
              onClick={handleRefreshCityWeather}
            />
            <DeleteIcon
              className={classes.controlIcon}
              onClick={handleDeleteCity}
            />
          </Grid>
        ) : null}
      </Grid>
      {city.weatherParams.temp !== null ? (
        <Grid container className={classes.weatherParamContainer}>
          <TempIcon fill="#777" className={classes.smallWeatherIcon} />
          <Typography className={classes.weatherParamValue}>
            {city.weatherParams.temp} &#8451;
          </Typography>
        </Grid>
      ) : null}
      {city.weatherParams.windSpeed !== null ? (
        <Grid container className={classes.weatherParamContainer}>
          <WindIcon fill="#777" className={classes.smallWeatherIcon} />
          <Typography className={classes.weatherParamValue}>
            {city.weatherParams.windSpeed} m/s
          </Typography>
        </Grid>
      ) : null}
      {city.weatherParams.rain ? (
        <Grid>
          <RainIcon fill="#777" className={classes.bigWeatherIcon} />
        </Grid>
      ) : null}
      {city.weatherParams.snow ? (
        <Grid>
          <SnowIcon fill="#777" className={classes.bigWeatherIcon} />
        </Grid>
      ) : null}
    </Grid>
  );
}

export default CityCard;

CityCard.propTypes = {
  className: PropTypes.string,
  city: PropTypes.object.isRequired,
  disableControls: PropTypes.bool,
};
