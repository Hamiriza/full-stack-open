import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.appBarBackground,
    padding: 16
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <AppBarTab text={'Repositories'} />
  </View>
  )
};

export default AppBar;