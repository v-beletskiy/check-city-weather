import axios from "axios";
import config from "../config";
import appUtils from "../utils/appUtils";

export default class AppService {
  static getCityWeather = async (cityName) => {
    try {
      const apiString = `${config.OPEN_WEATHER_URI}/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
      const res = await axios.get(apiString);
      return res.status === 200 && res.data ? res.data : null;
    } catch (err) {
      console.error(err);
    }
  };

  static getCityCoordsByName = async (cityName) => {
    try {
      const apiString = `${config.OPEN_CAGE_DATA}/geocode/v1/json?q=${cityName}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`;
      const res = await axios.get(apiString);
      return res.status === 200 && res.data
        ? res.data.results[0].geometry
        : null;
    } catch (err) {
      console.error(err);
    }
  };

  static getCityNameByCoords = async (coords) => {
    try {
      const { lat, lng } = coords;
      const apiString = `${config.OPEN_CAGE_DATA}/geocode/v1/json?q=${lat}+${lng}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`;
      const res = await axios.get(apiString);
      if (res.status === 200 && res.data && res.data.results.length) {
        const cityName = res.data.results[0].components.city;
        const cityNameToSearch = appUtils.transformCityNameToSearch(cityName);
        return cityNameToSearch;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  static getHourlyCityTemperature = async (cityName) => {
    try {
      const cityCoords = await AppService.getCityCoordsByName(cityName);
      if (cityCoords) {
        const { lat, lng } = cityCoords;
        const apiString = `${config.OPEN_WEATHER_URI}/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=current,minutely,daily&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
        const res = await axios.get(apiString);
        return res.status === 200 && res.data ? res.data.hourly : null;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };
}
