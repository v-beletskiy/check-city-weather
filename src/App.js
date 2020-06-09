import React from "react";
import { Provider } from "react-redux";
import { store, history } from "./store/store";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme.js";
import "./styles/normalize.scss";
import Utils from "./utils/utils";
import Index from "./pages/Index/Index";
import City from "./pages/City/City";
import Header from "./components/Header/Header";

const checkIfCityExists = () => {
  const pathname = decodeURI(window.location.pathname);
  const lastSlugPart = Utils.getLastSLugPart(pathname);
  const state = store.getState();
  return state.app.cities.some((city) => city.cityName.includes(lastSlugPart));
};

const PrivateRoute = (props) => {
  const { checkCallback } = props;
  return (
    <Route
      {...props}
      render={() => {
        return checkCallback() ? <City /> : <Redirect to="/" />;
      }}
    />
  );
};

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <Header />
          <Switch>
            <Route path="/" exact component={Index} />
            <PrivateRoute
              path="/city/:name"
              exact
              checkCallback={checkIfCityExists}
            />
            <Redirect to="/" />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
