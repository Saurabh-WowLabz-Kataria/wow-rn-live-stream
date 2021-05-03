
export const USER_TYPE = "userType";
export const HOST = "host";
export const CO_HOST = "coHost";
export const ATTENDEE = "attendee";
export const ITEM_SEPERATOR = "/";

//Fiebase constants
export const CHATS = "/chat/chats";
export const CHATS_COUNT = "/chat/totalComments";
export const TOTAL_AUDIENCE = "/callStatus/totalAudience";
export const CHAT_VISIBILITY = "/callStatus/chatVisible";
export const CALL_STATUS = "/callStatus/isActive";
export const ACTIVE_ROOMS_LIST = "/activeRooms";
export const SET_CALL_STATUS = "/callStatus";
export const REACTIONS_ROOT = "/reactions";
export const ACTIVITY_MAP = "/activityMap";
export const QUESTIONS = "/questions";

export var BASE_URL = "https://meet.jit.si/";
export var INITIAL_REACTIONS = {
    "Star": 0
}

export function setBaseUrl(baseUrl) {
    BASE_URL = baseUrl;
}

export function setInitialReactions(reactionObject) {
    INITIAL_REACTIONS = reactionObject;
}