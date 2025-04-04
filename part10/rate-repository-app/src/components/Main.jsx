import { StyleSheet, View } from "react-native";
import RepositoryList from './RepositoryList';
import SignIn from "./SignIn";
import AppBar from "./AppBar";
import theme from "../theme";
import { Navigate, Routes, Route } from "react-router-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.backgroundMain
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar/>
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/signin" element={<SignIn />} />  
                <Route path="*" element={<Navigate to="/" replace/>} />
            </Routes>
        </View>
    )
}

export default Main;