import { createStore, applyMiddleware } from "redux";
//Combied Reducers
import combineReducers from "./reducers";
//Store
const store = createStore(combineReducers, applyMiddleware());
console.log(store.getState());
//
export default store;
