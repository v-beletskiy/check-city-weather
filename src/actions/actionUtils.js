import appUtils from "../utils/appUtils";

export default class ActionUtils {
  static generateCityWeatherObj = (cityName, cityWeather) => {
    const cityWeatherObj = {
      cityName: appUtils.transformCityNameToSave(cityName),
      weatherParams: {
        temp:
          cityWeather.main && cityWeather.main.hasOwnProperty("temp")
            ? parseInt(cityWeather.main.temp)
            : null,
        clouds: cityWeather.clouds ? cityWeather.clouds.all : null,
        windSpeed:
          cityWeather.wind && cityWeather.wind.hasOwnProperty("speed")
            ? cityWeather.wind.speed
            : null,
        rain: cityWeather.hasOwnProperty("rain"),
        snow: cityWeather.hasOwnProperty("snow"),
        pressure:
          cityWeather.main && cityWeather.main.hasOwnProperty("pressure")
            ? cityWeather.main.pressure
            : null,
        humidity:
          cityWeather.main && cityWeather.main.hasOwnProperty("humidity")
            ? cityWeather.main.humidity
            : null,
        visibility: cityWeather.visibility ? cityWeather.visibility : null,
      },
    };
    return cityWeatherObj;
  };

  static generateHourlyCityTemp = (data) => {
    const hourlyCityTemp = [];
    for (let i = 0; i < data.length; i++) {
      const currentHour = new Date(data[i].dt * 1000).getHours();
      if (currentHour === 0 && i !== 0) {
        break;
      }
      const hourData = {
        hour: currentHour,
        temp: parseInt(data[i].temp),
      };
      hourlyCityTemp.push(hourData);
    }
    return hourlyCityTemp;
  };
}
