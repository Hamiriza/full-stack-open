import { Pressable, StyleSheet, Text } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
    tab: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10, 
    }
})

const AppBarTab = ({ text, to }) => {
    return (
        <Link to={to} component={Pressable}>
            <Text style={styles.tab}>{text}</Text>
        </Link>
    )
}

export default AppBarTab;