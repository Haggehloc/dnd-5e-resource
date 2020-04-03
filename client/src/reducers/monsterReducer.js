import {
    ADD_MONSTER_TO_STATE,
    GET_MONSTER,
    GET_FAVORITES
} from "../actions/types";

const initialState = {
    monster: "",
    monsterView: "",
    favorites: ""
};

export default function(state = initialState, action){
    switch(action.type) {
        case GET_MONSTER:
            return {
                ...state,
                monsterView: action.payload
            };
        case ADD_MONSTER_TO_STATE:
            return {
                ...state,
                monster:action.payload
            };
        case GET_FAVORITES:
            return{
                ...state,
                favorites:action.payload
            }
        default:
            return state;
    }
}