import React, { Component } from 'react';
import {
  View,
  Alert,
} from 'react-native';

import * as firebase from 'firebase';

import style from 'styles/settings';
import Color from 'constants/colors';
import { Button } from 'react-native-elements';

export default class Settings extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Configurações',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main,
    },
  });

  constructor() {
    super();
    this.itemsRef = firebase.database().ref().child('Votos');
  }

  deleteVotes() {
    this.itemsRef.remove()
      .then(() => {
        Alert.alert('Atenção', 'todos os votos foram removidos pelo super user');
      });
  }

  render() {
    return (
      <View style={style.container}>
        <Button
          title="Resetar Votos"
          borderRadius={5}
          backgroundColor={Color.red}
          textStyle={{ fontWeight: 'bold' }}
          onPress={() => { this.deleteVotes(); }}
        />
      </View>
    );
  }
}
