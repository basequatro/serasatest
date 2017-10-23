import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Color from 'constants/colors';
import Albums from 'screens/albums';
import About from 'screens/about';
import Settings from 'screens/settings';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      resetData: false
    };
    Text.defaultProps.allowFontScaling = false;
  }

  renderWrapper(){
    const Navigator = TabNavigator({
      tab01:{
        screen: StackNavigator({
           scanner: { screen: Albums },
         }),
        navigationOptions: ({ navigation, screenProps }) => {
          return {
            tabBarLabel:'Albums',
            tabBarIcon: ({ focused ,tintColor }) => (
              <Icon name="music" type={'font-awesome'} size={20} color={!focused ? Color.darkBlue : 'white'}/>
            ),
          };
        }
      },
      tab02: {
        screen:  StackNavigator({
          home: { screen: About },
          settings:{ screen: Settings},
         }),
        navigationOptions: ({ navigation, screenProps }) => {
          return {
            tabBarLabel: 'Sobre',
            tabBarIcon: ({ focused ,tintColor }) => (
              <Icon name="user" type={'font-awesome'}  size={20} color={!focused ? Color.darkBlue : 'white'}  />
            ),
          };
        }
      },

    },{
    tabBarOptions: {
      inactiveTintColor: Color.darkBlue,
      activeTintColor:'white',
      style:{
        height:55,
        backgroundColor: Color.main,
      }
    }
    });

    return (
      <Navigator />
    );

  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <StatusBar barStyle="dark-content"/>
        {this.renderWrapper()}
      </View>
    );
  }
}
