import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../theme";


const styles = StyleSheet.create({
    tab: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

const AppBarTab = ({ text }) => {
    return (
        <Pressable>
            <Text style={styles.tab}>{text}</Text>
        </Pressable>
    )
}

export default AppBarTab;