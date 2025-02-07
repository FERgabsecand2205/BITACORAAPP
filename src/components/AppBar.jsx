import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useNavigate } from 'react-router-native'; // Importar useNavigate

const AppBarLogIn = () => {

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Text>
                    <Ionicons name="home" size={25} color="black" /> {/* Usar el icono de usuario */}
                </Text>
            </View>
            <View style={styles.titleContainer}>                        
                <Link to="/" component={TouchableOpacity}>
                    <Text style={styles.title}>Bitácora App</Text>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    titleContainer: {
        flex: 0.9,
        alignItems: 'flex-end',
    },
    iconContainer: {
        flex: 0.1,
        alignItems: 'flex-end',
        marginTop: 10,
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default AppBarLogIn;
