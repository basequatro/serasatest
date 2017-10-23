import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert,
  Text,
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';

import * as firebase from 'firebase';

import style from 'styles/albums';
import Color from 'constants/colors';
import APIs from 'network/api';

import { Icon } from 'react-native-elements';

export default class Albums extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Serasa',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main,
    },
  });

  constructor() {
    super();
    this.state = {
      votesAll: null,
    };

    this.itemsRef = firebase.database().ref().child('Votos');
  }

  componentWillMount() {
    this.getAlbums();
    this.listenForItems();
  }

  getAlbums() {
    this.setState({ loading: true }, () => {
      APIs.getData().then((res) => {
        if (!res) {
          Alert.alert('Erro', 'Sem conexão de internet');
          this.setState({ loading: false });
          return;
        }
        this.setState({
          res,
          loading: false,
        });
      });
    });
  }

  listenForItems() {
    this.itemsRef.on('value', (snap) => {
      // get children as an array
      console.log('snap', snap.val());
      this.setState({
        votesAll: snap.val(),
      });
    });
  }

  voteFirebase(upOrDown, i) {
    // TODO: Falta especificação no projeto
    // Somente um voto por usuário?
    // Criar autenticação anômnima ou por uuid para permitir um voto somente?
    // Usuário pode votar em só um album?
    // Utilizar transactions para garantir valores em tempo real entre usuários
    // ou
    // Usar regras do firebase para incrementar valor com lógica no BE
    // usar chave única para cada entrada do map (i)
    // converter chamadas API e FIrebase para redux se o aplicativo ficar mais complexo

    this.itemsRef.child(i).once('value', (snap) => {
      if (snap.val() === null) {
        if (upOrDown === 'minus') {
          this.itemsRef.child(i).set({
            votes: 0,
          });
        } else {
          this.itemsRef.child(i).set({
            votes: 1,
          });
        }
      } else {
        const total = snap.val().votes;
        if (upOrDown === 'minus' && total !== 0) {
          this.itemsRef.child(i).update({
            votes: total - 1,
          });
        }
        if (upOrDown === 'plus') {
          this.itemsRef.child(i).update({
            votes: total + 1,
          });
        }
      }
    });
  }

  renderAlbums() {
    // remove inline-style
    const { loading } = this.state;
    if (!loading) {
      return this.state.res.map((album, i) => (
        <ImageBackground style={style.imageStyle} key={i} source={{ uri: album.image }}>
          <View style={{ position: 'absolute', right: 0 }}>
            {this.state.votesAll !== null && this.state.votesAll[i] && this.state.votesAll[i].votes >= 1 ?
              <View style={{ backgroundColor: '#666' }}>
                <Text style={{ color: 'white', alignSelf: 'center', padding: 5 }}>{this.state.votesAll[i].votes || '-'} {this.state.votesAll[i].votes === 1 ? 'Voto' : 'Votos'}</Text>
              </View>
            : null
            }
            <View style={{ flexDirection: 'row' }}>
              <Icon name="thumbs-up" containerStyle={{ padding: 10, backgroundColor: Color.darkBlue }} type="font-awesome" size={25} color={Color.white} onPress={() => this.voteFirebase('plus', i)} />
              <Icon name="thumbs-down" containerStyle={{ padding: 10, backgroundColor: Color.red }} type="font-awesome" size={25} color={Color.white} onPress={() => this.voteFirebase('minus', i)} />
            </View>
          </View>
          <View style={style.info}>
            <View>
              <Image style={style.thumb} source={{ uri: album.thumbnail_image }} />
            </View>
            <View style={style.text}>
              <Text style={style.artist}>{album.artist || '-'}</Text>
              <Text style={style.title}>{album.title || '-'}</Text>
            </View>
            <View style={style.buttonWrap}>
              <TouchableOpacity style={style.button} onPress={() => Linking.openURL(album.url)}>
                <Text style={style.buttonText}>Comprar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>));
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" animating={loading} />
      </View>
    );
  }


  render() {
    // console.log('votes', this.state.votesAll[0].votes)
    return (
      <ScrollView contentContainerStyle={style.container}>
        <StatusBar barStyle="light-content" />
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}
