import {
  AppRegistry,
} from 'react-native';
import App from './src/App';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCqZnju-PsRgq5JvQNQim49UYpWv8IG5yA',
  authDomain: 'serasa-7f61f.firebaseapp.com',
  databaseURL: 'https://serasa-7f61f.firebaseio.com',
  projectId: 'serasa-7f61f',
  storageBucket: '',
  messagingSenderId: '379234454517',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent('serasatest', () => App);
