import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import LargeButton from '../components/LargeButton'; // Importar LargeButton
import LayoutPage from '../components/LayoutPage'; // Importar LayoutPage
import HeaderTitle from '../components/HeaderTitle'; // Importar HeaderTitle
import { useNavigate } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';

const WellcomePage = () => {
<<<<<<< HEAD
const navigate = useNavigate();

const checkServerStatus = async () => {
        try {
            console.log('=== Verificando estado del servidor ===');
            const response = await fetch('https://bitacoraapp.onrender.com/api/bitacoras');
=======
    const navigate = useNavigate();

    const checkServerStatus = async () => {
        try {
            console.log('=== Verificando estado del servidor ===');
            const response = await fetch('http://localhost:3001/api/bitacoras');
>>>>>>> main
            if (response.ok) {
                console.log('✅ Servidor funcionando correctamente');
                return true;
            }
        } catch (error) {
            console.log('❌ Servidor no está funcionando');
            console.log('=== Instrucciones para iniciar el servidor ===');
            console.log('1. Abre una terminal nueva');
            console.log('2. Navega al directorio del backend:');
            console.log('   cd BITACORABACKEND');
            console.log('3. Inicia el servidor:');
            console.log('   node src/server.js');
            console.log('4. Espera a ver el mensaje: "Servidor corriendo en http://localhost:3001"');
            return false;
        }
    };

    const handleStart = async () => {
        const isServerRunning = await checkServerStatus();
        if (isServerRunning) {
            navigate('/newBitacora');
        } else {
            Alert.alert(
                'Servidor no disponible',
                'El servidor backend no está funcionando. Por favor, inicia el servidor antes de continuar.',
                [
                    {
                        text: 'Entendido',
                        style: 'cancel'
                    }
                ]
            );
        }
    };

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
                    onPress={handleStart} 
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
