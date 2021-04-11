import { CLEAR_DATA, UPDATE_LIVE_COUNT, UPDATE_REACTION_MAPPER, SET_REACTION_MAPPER } from "./actionTypes";

/**
 * Action to update live count of the audience
 * 
 */
export function onUpdateCount(count) {
    return dispatch => {
        dispatch({ type: UPDATE_LIVE_COUNT, payload: count == null ? 0 : count });
    }
}

/**
 * Action to update local reactions mapper
 * 
 */
export function onUpdateReactionMapper(value) {
    return dispatch => {
        dispatch({ type: UPDATE_REACTION_MAPPER, payload: value });
    }
}

/**
 * Action to update the reaction map
 * 
 */
export function setReactionMap(value) {
    return dispatch => {
        dispatch({ type: SET_REACTION_MAPPER, payload: value });
    }
}

/**
 * Action to clear data
 * 
 */
export function onClearData() {
    return dispatch => {
        dispatch({ type: CLEAR_DATA });
    }
}