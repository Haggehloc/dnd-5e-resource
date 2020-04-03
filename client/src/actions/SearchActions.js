import axios from "axios";

import {
    GET_MONSTER,
    GET_ERRORS,
    GET_FAVORITES
} from "./types";

// Get the given monster
export const getMonster = monster => dispatch => {
    let connectString = "/api/monsters/" + monster;
    console.log(connectString);
    return axios
        .get(connectString)
        .then(res =>
            dispatch({
                type: GET_MONSTER,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
};

// Get the given monster
export const getFavorites = () => dispatch => {
    let connectString = "/api/favorites";
    console.log(connectString);
    return axios
        .get(connectString)
        .then(res =>
            dispatch({
                type: GET_FAVORITES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        );
};