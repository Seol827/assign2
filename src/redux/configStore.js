import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import word from "./modules/word";


const middlewares = [thunk];  //미들웨어
const rootReducer = combineReducers({word});   //여러개 합치려면 bucket, ~ , ~ 이런 식으로 줄줄이 써주면 됨
const enhancer = applyMiddleware(...middlewares);  //미들웨어

const store = createStore(rootReducer, enhancer);


export default store;