import { ActionType } from "../actions/actionTypes";

const appInitialState = {
  loading: false,
  currentCity: {},
  cities: [],
  addCityError: false,
  hourlyCityTemp: [],
};

export default (state = appInitialState, action) => {
  switch (action.type) {
    case ActionType.ADD_CITY: {
      const cityWeatherObj = action.payload;
      return { ...state, cities: [...state.cities, cityWeatherObj] };
    }
    case ActionType.ADD_CITY_ERROR: {
      const addCityError = action.payload;
      return { ...state, addCityError };
    }
    case ActionType.DELETE_CITY: {
      const { cityName } = action.payload;
      const cities = state.cities.filter((city) => city.cityName !== cityName);
      return { ...state, cities };
    }
    case ActionType.UPDATE_CITIES_WEATHER: {
      const citiesWeather = action.payload;
      return { ...state, cities: citiesWeather };
    }
    case ActionType.REFRESH_CITY_WEATHER: {
      const cityWeatherObj = action.payload;
      const cities = [...state.cities];
      const cityToUpdateIndex = cities.findIndex(
        (city) => city.cityName === cityWeatherObj.cityName
      );
      cities[cityToUpdateIndex] = {
        ...state.cities[cityToUpdateIndex],
        weatherParams: {
          ...state.cities[cityToUpdateIndex].weatherParams,
          ...cityWeatherObj.weatherParams,
        },
      };
      return { ...state, cities };
    }
    case ActionType.GET_HOURLY_CITY_TEMPERATURE: {
      const hourlyCityTemp = action.payload;
      return { ...state, hourlyCityTemp };
    }
    case ActionType.ADD_CURRENT_CITY: {
      const cityWeatherObj = action.payload;
      return { ...state, currentCity: cityWeatherObj };
    }
    default: {
      return state;
    }
  }
};
