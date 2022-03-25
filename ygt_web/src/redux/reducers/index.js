import { combineReducers } from "redux";
//Reducers
import testReducer from "./test.Reducer";
import loadingReducer from "./loading.Reducer";
import userReducer from "./user.Reducer";

//
const combinedReducers = combineReducers({
  testReducer,
  loadingReducer,
  userReducer,
});
export default combinedReducers;
