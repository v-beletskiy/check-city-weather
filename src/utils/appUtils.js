import Utils from "./utils";

export default class appUtils {
  static transformCityNameToSearch = (cityName) => {
    const uppercasedCityName = Utils.getFirstLetterUppercased(cityName);
    const withoutHyphensCityName = Utils.replaceHyphensWithSpacesIfAny(
      uppercasedCityName
    );
    return withoutHyphensCityName;
  };

  static transformCityNameToSave = (cityName) => {
    const spacelessCityName = Utils.removeStringSpaces(cityName);
    return spacelessCityName.toLowerCase();
  };

  static getColorByTemp = (temp) => {
    let color = "";
    if (temp < -30) {
      color = "#002ed6";
    } else if (temp < -20) {
      color = "#0073d6";
    } else if (temp < -10) {
      color = "";
    } else if (temp < 0) {
      color = "#00ccd6";
    } else if (temp < 10) {
      color = "#00d642";
    } else if (temp < 20) {
      color = "#b4ff00";
    } else if (temp < 30) {
      color = "#ffc800";
    } else {
      color = "#ff5e00";
    }
    return color;
  };
}
