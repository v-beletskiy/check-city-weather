import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2f981c",
    },
    secondary: {
      main: "#157268",
    },
    error: {
      main: "#e80000",
    },
    text: {
      main: "#212121",
      contrast: "#fff",
    },
    background: {
      main: "#f9f9f9",
      hover: "#efefef",
    },
  },
});

export default theme;
