import { View, StyleSheet, Text, ScrollView } from 'react-native';
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
    },
    scrollContainer: {
        flexGrow: 1,
        flexShrink: 0
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <AppBarTab text={'Repositories'} to="/" />
                <AppBarTab text={'Sign-In'} to="/signin" />
            </ScrollView>
        </View>
    )
};

export default AppBar;