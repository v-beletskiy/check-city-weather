import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Utils from "../../utils/utils";
import appUtils from "../../utils/appUtils";

const useStyles = makeStyles((theme) => ({
  temperatureWidgetContainer: {
    justifyContent: "space-between",
    flexWrap: "nowrap",
    height: "var(--temperature-widget-height)",
    borderLeft: "3px solid #e2e2e2",
    borderRight: "3px solid #e2e2e2",
    [theme.breakpoints.down(1280)]: {
      display: "none",
    },
  },
  tempItem: {
    position: "relative",
    width: "calc(100% / var(--items-count))",
    height: "var(--item-height)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "4px 0",
    color: theme.palette.text.main,
    fontWeight: 700,
  },
  hour: {
    position: "absolute",
    bottom: 30,
    fontWeight: 700,
  },
}));

const setCSSVars = (widgetHeight, itemsCount, itemHeight) => {
  document
    .querySelector(":root")
    .style.setProperty("--temperature-widget-height", `${widgetHeight}px`);
  document
    .querySelector(":root")
    .style.setProperty("--items-count", itemsCount);
  document
    .querySelector(":root")
    .style.setProperty("--item-height", `${itemHeight}px`);
};

const getItemTopOffset = (maxTemp, currentTemp, stepHeight) => {
  return `${(maxTemp - currentTemp) * stepHeight}px`;
};

function TemperatureWidget(props) {
  const { data, itemHeight, stepHeight } = props;
  const classes = useStyles();
  const tempArr = data.map((item) => item.temp);
  const maxVal = Math.max(...tempArr);
  const minVal = Math.min(...tempArr);
  const height = (maxVal - minVal) * stepHeight + itemHeight;
  const itemsCount = tempArr.length;

  setCSSVars(height, itemsCount, itemHeight);

  return (
    <Grid container className={classes.temperatureWidgetContainer}>
      {data.map((item) => {
        return (
          <Grid
            key={item.hour}
            className={classes.tempItem}
            style={{
              top: getItemTopOffset(maxVal, item.temp, stepHeight),
              backgroundColor: appUtils.getColorByTemp(item.temp),
            }}
          >
            {Utils.getValWithPlusSign(item.temp)}
            <Typography className={classes.hour}>{item.hour}:00</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default TemperatureWidget;

TemperatureWidget.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  itemHeight: PropTypes.number.isRequired,
  stepHeight: PropTypes.number.isRequired,
};
