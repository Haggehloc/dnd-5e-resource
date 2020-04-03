import { combineReducers } from "redux";
import monsterReducer from "./monsterReducer";


export default combineReducers({
    monster: monsterReducer
});