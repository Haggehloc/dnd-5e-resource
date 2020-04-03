import {
    ADD_MONSTER_TO_STATE
} from "./types";

// Adds the given monster to the state
export const addMonsterToState = monster => dispatch => {
    return dispatch(
        {
            type: ADD_MONSTER_TO_STATE,
            payload:monster
        }
    )
};