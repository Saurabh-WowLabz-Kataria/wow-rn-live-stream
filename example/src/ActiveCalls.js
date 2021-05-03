import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable
} from "react-native";
import { ACTIVE_ROOMS_LIST, ITEM_SEPERATOR, ATTENDEE } from 'react-native-wow-rn-live-stream';
import database from '@react-native-firebase/database';

class ActiveCalls extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSessionsList: []
        }
    }

    componentDidMount() {
        this.activeRoomsRef = database().ref(ITEM_SEPERATOR + ACTIVE_ROOMS_LIST)
            .on('value', snapshot => {
                this.setState({
                    activeSessionsList: snapshot.val() ? Object.values(snapshot.val()) : []
                })
            })
    }

    componentWillUnmount() {
        database().ref(ITEM_SEPERATOR + ACTIVE_ROOMS_LIST)
            .off('value', this.activeRoomsRef);
    }

    /**
    * Method that returns the message item component for chat list
    * 
    * @param {*} param0 
    */
    _renderItemComponent = ({ item, index }) => {
        return (
            <Pressable
                onPress={() => { this.joinCall(item) }}>
                <Text>
                    {item.roomName}
                </Text>
            </Pressable>
        )
    }

    /**
   * Method to end/leave the stream and send the callback to the parent 
   * component
   * 
   */
    joinCall = (item) => {
        this.props.navigation.navigate('VideoCall', {
            url: 'https://meet.jit.si/' + item.roomName,
            user: ATTENDEE,
            userName: 'Sample User',
            email: 'example@email.com',
            userImageUrl: 'https://picsum.photos/100'
        });
        // return true
    };

    render() {
        return (
            <View style={Styles.root}>
                <FlatList
                    data={this.state.activeSessionsList}
                    extraData={this.state}
                    renderItem={this._renderItemComponent}
                    style={Styles.flatlistStyle}
                    contentContainerStyle={Styles.listContainerStyle} />

            </View>
        )
    }
}

const Styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: "#000000",
        margin: 24,
        textAlign: 'center'
    },
    flatlistStyle: {
        marginTop: 16,
        marginBottom: 4
    },
    listContainerStyle: {
        flex: 0
    },
})

export default (ActiveCalls)