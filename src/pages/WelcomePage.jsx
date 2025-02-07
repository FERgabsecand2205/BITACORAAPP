import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LargeButton from '../components/LargeButton'; // Importar LargeButton
import LayoutPage from '../components/LayoutPage'; // Importar LayoutPage
import HeaderTitle from '../components/HeaderTitle'; // Importar HeaderTitle
import { useNavigate } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';

const WellcomePage = () => {
    const navigate = useNavigate();

    return (
        <LayoutPage
            header={<HeaderTitle titleName="Bienvenido" />}
            body={
                <View style={styles.centered}>
                    <Text style={styles.title}>Bitácora App</Text>
                    <Ionicons name="airplane" size={50} color="black" /> 
                </View>
            }
            buttons={
                <LargeButton 
                    title="Iniciar" 
                    onPress={() => navigate('/createnewbitacora')} 
                />
            }
            footer={
                <View>
                    <Text></Text>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32, // Tamaño de título H1
        marginBottom: 10, // Espacio entre el texto y el icono
    },
});

export default WellcomePage;
