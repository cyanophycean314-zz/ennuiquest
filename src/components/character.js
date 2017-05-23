import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Picker
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class CharacterScreen extends Component {
    static navigationOptions = {
        title: "Create your character"
    }

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            race : "",
            pclass : ""
        }
    }
    
    render() {
        return (
            <View style={{padding: 10}}>
                <Image
                    source={require('../img/header_title.png')}
                />
                <TextInput
                    style={{paddingTop: 20}}
                    placeholder="Name"
                    onChangeText={(text) => this.setState({name: text})}
                    value={this.state.name}
                />
                <Text>Race: </Text>
                <Picker
                    selectedValue={this.state.race}
                    onValueChange={(text) => this.setState({race : text})}
                >
                    <Picker.Item label="Elf" value="elf" />
                    <Picker.Item label="Human" value="human" />
                </Picker>
                <Text>Class: </Text>
                <Picker
                    selectedValue={this.state.pclass}
                    onValueChange={(text) => this.setState({pclass : text})}
                >
                    <Picker.Item label="Warrior" value="warrior" />
                    <Picker.Item label="Mage" value="mage" />
                    <Picker.Item label="Thief" value="thief" />
                </Picker>
                <Text>Race chosen: {this.state.race}</Text>
                <Text>Class chosen: {this.state.pclass}</Text>
            </View>
        );
    }
}

export { CharacterScreen };