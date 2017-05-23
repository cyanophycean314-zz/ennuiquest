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
import { StackNavigator } from 'react-navigation';

class CharacterScreen extends Component {
    static navigationOptions = {
        title: "Create your character"
    }

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            race : "human",
            pclass : "warrior"
        }
    }
    
    verifyFields = () => {
        for (let trait in this.state) {
            if (typeof this.state[trait] === "string" && this.state[trait].length == 0) {
                ToastAndroid.show(`One cannot venture without choosing thy ${trait}`, ToastAndroid.SHORT);
                return;
            }
        }
        const { navigate } = this.props.navigation;
        navigate('Stats');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../img/header_title.png')}
                />
                <TextInput
                    style={{paddingTop: 20}}
                    placeholder="Name"
                    autoCapitalize="words"
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
                <Text style={styles.announcement}>
                    Our new hero is
                    <Text style={styles.chosen}>
                        {` ${this.state.name}`}
                    </Text>
                    , a legendary
                    <Text style={styles.chosen}>
                        {` ${this.state.race} `}
                    </Text>
                    trained as a master
                    <Text style={styles.chosen}>
                        {` ${this.state.pclass} `}
                    </Text>
                </Text>
                <Button
                    title="Venture on your journey!"
                    onPress={() => this.verifyFields()}
                />
            </View>
        );
    }
}

class StatsScreen extends Component {
    render() {
        return <Text> Choose stats </Text>;
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    announcement: {
        padding: 10,
        fontSize: 20
    },
    chosen: {
        fontWeight: 'bold'
    }
})

export { CharacterScreen, StatsScreen };