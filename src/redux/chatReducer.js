import {
    CLEAR_DATA,
    SET_CHAT_EMOTICONS_STATUS,
    UPDATE_LIVE_COUNT,
    UPDATE_REACTION_MAPPER,
    SET_REACTION_MAPPER
} from './actionTypes';
import {
    INITIAL_REACTIONS
} from '../utils/Constants';

const INITIAL_STATE = {
    prevCount: 0,
    count: 0,
    liveAudienceCount: 0,
    totalReactions: INITIAL_REACTIONS,
    reactions: []
}

export default function chatsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case SET_CHAT_EMOTICONS_STATUS: {
            return {
                ...state,
                count: action.payload,
                prevCount: action.payload + state.prevCount
            }
        }
        case UPDATE_LIVE_COUNT: {
            return {
                ...state,
                liveAudienceCount: action.payload,
            }
        }
        case UPDATE_REACTION_MAPPER: {
            return {
                ...state,
                totalReactions: action.payload,
            }
        }
        case SET_REACTION_MAPPER: {
            return {
                ...state,
                reactions: action.payload
            }
        }
        case CLEAR_DATA:
            return INITIAL_STATE;
        default:
            return state
    }
}