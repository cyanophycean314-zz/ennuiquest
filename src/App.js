/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { CharacterScreen, StatsScreen } from './components/character';

class TitleScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to
        </Text>
        <Image
          style={styles.headerlogo}
          source={require('./img/main_title.png')}
        />
        <Text style={styles.instructions}>{`
          By Kevin Fei

          This epic quest of minimal inactivity
          is ready to be played by you!

          Made with React Native
          `}
        </Text>
        <View>
          <Button
            onPress={() => navigate('Character')}
            title="Begin your Journey"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 15,
  },
  headerlogo: {
    width: 160,
    height: 160
  }
});

const EnnuiQuest = StackNavigator ({
    Home: { screen: TitleScreen },
    Character: { screen: CharacterScreen },
    Stats: { screen: StatsScreen }
});

AppRegistry.registerComponent('EnnuiQuest', () => EnnuiQuest);
