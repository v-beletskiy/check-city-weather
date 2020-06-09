export default class Utils {
  static removeStringSpaces = (str) => {
    return str ? str.replace(/ /g, "-") : "";
  };

  static getFirstLetterUppercased = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
  };

  static getLastSLugPart = (slug) => {
    return slug.length ? slug.split("/")[slug.split("/").length - 1] : "";
  };

  static replaceHyphensWithSpacesIfAny = (str) => {
    if (str.split("-").length > 1) {
      return str.split("-").join(" ");
    } else {
      return str;
    }
  };

  static getValWithPlusSign = (val) => {
    return Math.sign(val) === 1 ? `+${val}` : val;
  };
}
