import { ActionType } from "./actionTypes";
import { store, history } from "../store/store";
import AppService from "../services/AppService";
import ActionUtils from "./actionUtils";
import Utils from "../utils/utils";
import appUtils from "../utils/appUtils";

export const addCity = (cityName) => async (dispatch) => {
  const app = store.getState().app;
  if (!app.cities.some((city) => city.cityName === cityName)) {
    dispatch({
      type: ActionType.ADD_CITY_ERROR,
      payload: false,
    });
    const cityWeather = await AppService.getCityWeather(cityName);
    if (cityWeather) {
      const cityWeatherObj = ActionUtils.generateCityWeatherObj(
        cityName,
        cityWeather
      );
      dispatch({
        type: ActionType.ADD_CITY,
        payload: cityWeatherObj,
      });
    } else {
      dispatch({
        type: ActionType.ADD_CITY_ERROR,
        payload: true,
      });
    }
  }
};

export const deleteCity = (cityName) => (dispatch) => {
  dispatch({
    type: ActionType.DELETE_CITY,
    payload: {
      cityName: cityName,
    },
  });
};

export const updateStoredCitiesWeather = (cities) => (dispatch) => {
  const citiesWeatherPromises = cities.map((cityName) => {
    return new Promise(async (res, rej) => {
      const cityWeather = await AppService.getCityWeather(
        appUtils.transformCityNameToSearch(cityName)
      );
      if (cityWeather) {
        const cityWeatherObj = ActionUtils.generateCityWeatherObj(
          cityName,
          cityWeather
        );
        res(cityWeatherObj);
      } else {
        rej();
      }
    });
  });
  Promise.all(citiesWeatherPromises)
    .then((citiesWeather) =>
      dispatch({
        type: ActionType.UPDATE_CITIES_WEATHER,
        payload: citiesWeather,
      })
    )
    .catch((err) =>
      console.error(
        `We've encountered a problem while cities weather update. Check the error, ${err}`
      )
    );
};

export const refreshCityWeather = (cityName) => async (dispatch) => {
  const cityWeather = await AppService.getCityWeather(
    appUtils.transformCityNameToSearch(cityName)
  );
  if (cityWeather) {
    const cityWeatherObj = ActionUtils.generateCityWeatherObj(
      cityName,
      cityWeather
    );
    dispatch({
      type: ActionType.REFRESH_CITY_WEATHER,
      payload: cityWeatherObj,
    });
  }
};

export const getHourlyCityTemperature = (cityName) => async (dispatch) => {
  const res = await AppService.getHourlyCityTemperature(
    appUtils.transformCityNameToSearch(cityName)
  );
  const hourlyCityTemp = ActionUtils.generateHourlyCityTemp(res);
  dispatch({
    type: ActionType.GET_HOURLY_CITY_TEMPERATURE,
    payload: hourlyCityTemp,
  });
  const spacelessCityName = Utils.removeStringSpaces(cityName);
  history.push(`/city/${spacelessCityName.toLowerCase()}`);
};

export const getCurrentCityWeather = (coords) => async (dispatch) => {
  const cityName = await AppService.getCityNameByCoords(coords);
  if (cityName) {
    const cityWeather = await AppService.getCityWeather(cityName);
    if (cityWeather) {
      const cityWeatherObj = ActionUtils.generateCityWeatherObj(
        cityName,
        cityWeather
      );
      dispatch({
        type: ActionType.ADD_CURRENT_CITY,
        payload: cityWeatherObj,
      });
    }
  }
};
