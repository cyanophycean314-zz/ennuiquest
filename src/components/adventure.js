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
  ToastAndroid,
  ScrollView
} from 'react-native';
import {
    Animated,
    Easing,
    Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { makeStory } from './story';

class AdventureScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            charInfo: this.props.navigation.state.params,
            inventory: {
                bug: 1,
                rock: 5
            }
        };
    }

    static navigationOptions = {
        title: "EnnuiQuest"
    };

    render() {
        return (
            <View style = {adventureStyles.container} >
                <CenterPanel
                    charInfo = {this.state.charInfo}
                    inventory = {this.state.inventory}
                    handleInventory = {(newInventory) => this.setState({inventory: newInventory})}
                />
                <BottomPanel
                    charInfo = {this.state.charInfo}
                    inventory = {this.state.inventory}
                />
            </View>
        )
    }
}

class CenterPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsListNum: 0,
            lineNumber: 0,
        };
        this.eventsList = makeStory(this.props.charInfo);
        this.fadeValue = new Animated.Value(0);
    }
    
    componentDidMount() {
        this.displayLine(0);
    }

    displayLine(eventnum) {
        this.fadeValue.setValue(0);
        if (eventnum >= this.eventsList[this.state.eventsListNum].length) {
            this.state.eventsListNum++;
            eventnum = 0;
            if (this.state.eventsListNum >= this.eventsList.length) {
                return;
            }
        }
        let nextEvent = this.eventsList[this.state.eventsListNum][eventnum];
        this.setState({lineNumber: eventnum});
        Animated.timing(
            this.fadeValue,
            {
                toValue: 1,
                duration: (nextEvent.time * 1000),
                easing: Easing.linear
            }
        ).start(() => this.nextEvent(eventnum, nextEvent));
    }

    nextEvent(eventnum, lastEvent) {
        //Monster slain
        newInventory = Object.assign({}, this.props.inventory)
        if (this.state.eventsListNum % 2 === 0) {
            if (lastEvent.drop in newInventory) {
                newInventory[lastEvent.drop]++;
            } else {
                newInventory[lastEvent.drop] = 1;
            }
            this.props.handleInventory(newInventory);
        }
        this.displayLine(eventnum + 1);
    }

    render() {
        let textOpacity = this.fadeValue.interpolate({
            inputRange: [0,0.1,0.8,1],
            outputRange: [0,1,1,0]
        });
        let monsterOpacity = this.fadeValue.interpolate({
            inputRange: [0,0.1,1],
            outputRange: [0,1,0.2]
        });
        let shrinkingWidth = this.fadeValue.interpolate({
            inputRange: [0,1],
            outputRange: [Dimensions.get('window').width, 0]
        })
        if (this.state.eventsListNum % 2 === 0) {
            //Fight a monster!
            return (
                <View style={adventureStyles.container}>
                    <View style={{flex: 4, justifyContent: "center"}} >
                        <Animated.Image
                            style={{height: 100, width: 100, opacity: monsterOpacity}} 
                            source={this.eventsList[this.state.eventsListNum][this.state.lineNumber].pic}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Animated.View style={{height:10, backgroundColor: "green", width: shrinkingWidth}} />
                    </View>
                    <Text style={{flex: 1}} >
                        Slaying a {this.eventsList[this.state.eventsListNum][this.state.lineNumber].name}
                    </Text>
                </View>
            )
        } else {
            //Tell some story!
            return (
                <View style = {adventureStyles.container} >
                    <Animated.Text
                        style={{opacity: textOpacity, flex: 1, fontSize: 20}}
                    >
                        {this.eventsList[this.state.eventsListNum][this.state.lineNumber].text}
                    </Animated.Text>
                </View>
            );
        }
    }
}

class BottomPanel extends Component {
    render() {
        return (
            <View style = {{flex: 1, flexDirection: "row"}} >
                <Characteristics 
                    charInfo={this.props.charInfo}
                />
                <Inventory
                    inventory={this.props.inventory}
                />
            </View> 
        )
    }
}

class Characteristics extends Component {
    render() {
        let charDisplay = [];
        let cInfo = this.props.charInfo.character;
        for (let prop in cInfo) {
            charDisplay.push(
                <Text key={prop}> {prop.charAt(0).toUpperCase() + prop.slice(1)}: {cInfo[prop]} </Text>
            )
        }
        let statDisplay = [];
        let sInfo = this.props.charInfo.ptraits;
        for (let prop in sInfo) {
            statDisplay.push(
                <Text key={prop}> {prop.charAt(0).toUpperCase() + prop.slice(1)}: {sInfo[prop]} </Text>
            );
        }
        return (
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    {charDisplay}
                </View>
                <View style={{flex:3}}>
                    {statDisplay}
                </View>
            </View>
        );
    }
}

class Inventory extends Component {
    render() {
        let items = [];
        for (let item in this.props.inventory) {
            items.push(<Text key = {item}>{item}: {this.props.inventory[item]} </Text>)
        }
        return (
            <View style={{flex:1}}>
                <Text> Inventory </Text>
                <ScrollView>
                    {items}
                </ScrollView>
            </View>
        );
    }
}

adventureStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    narration: {
        fontSize: 20
    }
});

export { AdventureScreen };