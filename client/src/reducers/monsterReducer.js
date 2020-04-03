import {
    ADD_MONSTER_TO_STATE,
    GET_MONSTER,
    GET_FAVORITES, SAVE_MONSTER_TO_FAVORITES
} from "../actions/types";

const initialState = {
    monster: "",
    monsterView: [],
    favorites: [],
    favoriteSaved: true
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
                favorites:[...state.favorites, action.payload]
            };
        case SAVE_MONSTER_TO_FAVORITES:
            return{
                ...state,
                favoriteSaved: true
            };
        default:
            return state;
    }
}