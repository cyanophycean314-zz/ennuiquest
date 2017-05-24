import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Picker,
  Button,
  ToastAndroid
} from 'react-native';
import {
    Animated,
    Easing
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { makeStory } from './story';

class AdventureScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            linenumber: 0,
        };
        const { params } = this.props.navigation.state;
        this.events = makeStory(params);

        this.fadeValue = new Animated.Value(0);
    }

    static navigationOptions = {
        title: "EnnuiQuest"
    };

    componentDidMount() {
        this.displayLine(0);
    }

    displayLine(eventnum) {
        this.fadeValue.setValue(0);
        if (eventnum >= this.events.length) {
            return;
        }
        this.setState({linenumber: eventnum});
        Animated.timing(
            this.fadeValue,
            {
                toValue: 1,
                duration: (this.events[eventnum].time * 1000),
                easing: Easing.linear
            }
        ).start(() => this.displayLine(eventnum + 1));
    }

    render() {
        let textOpacity = this.fadeValue.interpolate({
            inputRange: [0,0.1,0.8,1],
            outputRange: [0,1,1,0]
        });
        return (
            <View style = {adventureStyles.container} >
                <Animated.Text
                    style={[
                        adventureStyles.narration,
                        { opacity: textOpacity }
                    ]}
                >
                    {this.events[this.state.linenumber].text}
                </Animated.Text>
            </View>
        )
    }
}

adventureStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    narration: {
        fontSize: 20
    }
});

export { AdventureScreen };