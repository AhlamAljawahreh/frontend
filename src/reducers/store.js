import { combineReducers, createStore } from "redux";
import loginReducer from "./login/index";
import servicesReducer from "./services";
const reducers = combineReducers({
  loginReducer,servicesReducer
});

const store = createStore(reducers);

export default store;