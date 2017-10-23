import { StyleSheet, Dimensions } from 'react-native';
import Color from 'constants/colors';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 10,
    flexGrow: 1,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
    margin: 10,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#00000099',
    padding: 10,
    width: width - 40,
    flexDirection: 'row',
  },
  thumb: {
    height: 50,
    width: 50,
    margin: 5,
  },
  text: {
    justifyContent: 'center',
  },
  artist: {
    color: Color.white,
    fontSize: 20,
    textAlign: 'left',
  },
  title: {
    color: Color.grey,
    fontSize: 20,
    textAlign: 'left',
  },
  buttonWrap: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.blue,
    borderRadius: 5,
  },
  buttonText: {

    color: Color.darkBlue,
    borderRadius: 5
  },
});
