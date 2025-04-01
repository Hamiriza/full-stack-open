import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.backgroundItem,
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15
    },
    details: {
        flexShrink: 1
    },
    fullName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.colors.textPrimary
    },
    description: {
        color: theme.colors.textSecondary,
        marginTop: 4
    },
    languageContainer: {
        marginTop: 6,
        backgroundColor: theme.colors.primary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5,
        alignSelf: 'flex-start'
    },
    language: {
        color: 'white',
        fontWeight: 'bold'
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    statLabel: {
        fontSize: 12,
        color: theme.colors.textSecondary
    }
})

const formatNumber = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

const RepositoryItem = ({
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{uri: ownerAvatarUrl}} style={styles.avatar}/>
                <View style={styles.details}>
                    <Text style={styles.fullName}>{fullName}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.languageContainer}>
                        <Text style={styles.language}>{language}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{formatNumber(stargazersCount)}</Text>
                    <Text style={styles.statLabel}>Stars</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{formatNumber(forksCount)}</Text>
                    <Text style={styles.statLabel}>Forks</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{formatNumber(reviewCount)}</Text>
                    <Text style={styles.statLabel}>Reviews</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{formatNumber(ratingAverage)}</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                </View>
            </View>
        </View>
    )
}

export default RepositoryItem;