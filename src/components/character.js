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
import { gaussian } from '../lib/helpers';

const races = ["Human", "Elf", "Dwarf", "Giant"];
const pclasses = ["Warrior","Mage","Thief","Paladin"];

class ArrayPicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const options = this.props.array.map((el) =>
            <Picker.Item
                label={el}
                value={el.toLowerCase()}
                key={el}
            />
        );
        return (
            <Picker
                selectedValue={this.props.selectedValue}
                onValueChange={this.props.handleChange}
            >
                {options}
            </Picker>
        );
    }
}

class CharacterScreen extends Component {
    static navigationOptions = {
        title: "Create your character"
    }

    constructor(props) {
        super(props);
        this.state = {
            name : "",
            race : races[0].toLowerCase(),
            pclass : pclasses[0].toLowerCase()
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
        navigate('Stats', {character: this.state});
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
                <ArrayPicker
                    selectedValue={this.state.race}
                    handleChange={(text) => this.setState({race : text})}
                    array={races}
                />
                <Text>Class: </Text>
                <ArrayPicker
                    selectedValue={this.state.pclass}
                    handleChange={(text) => this.setState({pclass : text})}
                    array={pclasses}
                />
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

const traits = {
    strength: {
        mean: 10,
        stdev: 2
    },
    vitality: {
        mean: 8,
        stdev: 1
    },
    intelligence: {
        mean: 5,
        stdev: 1
    },
    spirit: {
        mean: 7,
        stdev: 2
    },
    luck: {
        mean: 10,
        stdev: 3
    }
};

class TraitRollers extends Component {
    render() {
        let traitRollers = [];
        for (let trait in traits) {
            traitRollers.push(
                <View style={{flex: 1, flexDirection: "row"}} key={trait} >
                    <Text style={{flex: 5, fontSize: 20}}> {trait.charAt(0).toUpperCase() + trait.slice(1)}: </Text>
                    <Text style={{flex: 2, fontSize: 20}}> {this.props.traitstate[trait]} </Text>
                </View>
            )
        }
        return (
            <View style={{flex: 1}}>
                {traitRollers}
            </View>
        );
    }
}

class StatsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Roll for ${navigation.state.params.character.name}'s statistics`
    })

    constructor(props) {
        super(props);
        this.state = {
            traits: {},
            rolling: false
        };
        for (let trait in traits) {
            this.state.traits[trait] = traits[trait].mean;
        }
    }
    
    reroll() {
        let newTraits = {};
        for (let trait in this.state.traits) {
            if (typeof this.state.traits[trait] === "number") {
                newTraits[trait] = Math.ceil(gaussian(traits[trait].mean, traits[trait].stdev)());
            }
        }
        this.setState({traits: newTraits});
    }

    stopRoll() {
        if (this.state.rolling) {
            clearInterval(this.timer);
            this.setState({rolling: false});
        } else {
            let { character } = this.props.navigation.state.params;
            let { ptraits } = this.state.traits;
            const { navigate } = this.props.navigation;
            navigate("Adventure", {...character, ...ptraits});
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => this.reroll(), 100);
        this.setState({rolling: true})
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{flex: 1, fontSize: 20}}> Roll wisely </Text>
                <View style={{flex:5}}>
                    <TraitRollers
                        traitstate={this.state.traits}
                    />
                    <Button
                        title={this.state.rolling ? "Roll!" : "Venture!"}
                        onPress={() => this.stopRoll()}
                        style={{flex:1}}
                    />
                </View>
            </View>
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
}

class AdventureScreen extends Component {
    render() {
        return <Text> Adventure </Text>;
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

export { CharacterScreen, StatsScreen, AdventureScreen };