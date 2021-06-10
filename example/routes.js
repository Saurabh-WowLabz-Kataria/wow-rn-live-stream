import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen'
import VideoCall from './src/VideoCall'
import ActiveCalls from './src/ActiveCalls'
import Settings from './src/Settings'

const Stack = createStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen} />

            <Stack.Screen
                options={{ headerShown: false }}
                name="VideoCall"
                component={VideoCall} />

            <Stack.Screen
                name="ActiveSessions"
                component={ActiveCalls} />
            <Stack.Screen
                name="Settings"
                options={{ headerShown: false }}
                component={Settings} />
        </Stack.Navigator>
    );
}

export default RootStack;