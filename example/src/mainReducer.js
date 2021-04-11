import { combineReducers } from '@reduxjs/toolkit';
import { chatsReducer } from 'react-native-wow-rn-live-stream';

export default combineReducers({
    chats: chatsReducer
});