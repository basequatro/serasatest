import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';

import Color from 'constants/colors';
import style from 'styles/home';
import SettingsButton from 'components/sideOptions';

export default class Home extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Sobre',
    headerMode: 'screen',
    headerRight: <SettingsButton onPress={() => { navigate('settings'); }} />,
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main,
    },
  });

  render() {
    return (
      <View style={style.container}>
        <StatusBar barStyle="light-content" />
        <Text style={style.title}>Teste Serasa Consumidor</Text>
        <Text style={style.title}>André Carrano {'\n'}</Text>
        <Text>React Native</Text>
        <Text>ES6</Text>
        <Text>Elements</Text>
        <Text>Firebase</Text>
        <Text>React Navigation</Text>
        <Text>Icons, Eslint, Jest</Text>
      </View>
    );
  }
}
