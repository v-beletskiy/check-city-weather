import throttle from "lodash/throttle";
import thunk from "redux-thunk";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "../reducers/appReducer";

export const history = createBrowserHistory();

let initState = {};
const persistedState = JSON.parse(localStorage.getItem("appState"));
if (persistedState) {
  initState = persistedState;
  initState.app.currentCity = {};
}

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer,
  });

export const store = createStore(
  createRootReducer(history),
  initState,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
);

store.subscribe(
  throttle(() => {
    localStorage.setItem("appState", JSON.stringify(store.getState()));
  }, 2000)
);
