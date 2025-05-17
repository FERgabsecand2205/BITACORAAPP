import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-native';
import { View, Text, StyleSheet } from 'react-native';
import SignaturePad from '../components/SignaturePad';
import LargeButton from '../components/LargeButton';

const SignaturePadPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [signature, setSignature] = useState(null);

    useEffect(() => {
        console.log('=== SignaturePadPage - useEffect ===');
        console.log('Estado de navegación:', location.state);
    }, [location.state]);

    const handleSaveSignature = (signatureData) => {
        console.log('=== SignaturePadPage - handleSaveSignature ===');
        console.log('Firma guardada exitosamente');
        console.log('Estado de la firma:', signatureData ? 'Presente' : 'No presente');
        setSignature(signatureData);
    };

    const handleFinish = () => {
        console.log('=== SignaturePadPage - handleFinish ===');
        console.log('Intentando finalizar firma...');
        console.log('Estado de la firma:', signature ? 'Presente' : 'No presente');
        console.log('Callback disponible:', location.state?.onSignatureComplete ? 'Sí' : 'No');
        console.log('Estado completo:', location.state);

        if (signature && location.state?.onSignatureComplete) {
            console.log('Ejecutando callback con la firma...');
            location.state.onSignatureComplete(signature);
        }

        console.log('Navegando a la página anterior...');
        navigate(location.state?.returnTo || '/', {
            state: {
                ...location.state,
                signature: signature,
                bitacoraId: location.state?.bitacoraId,
                formData: location.state?.formData,
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Captura de Firma</Text>
            
            <View style={styles.card}>
                <SignaturePad onSave={handleSaveSignature} />
            </View>

            <View style={styles.buttonContainer}>
                <LargeButton
                    title="Finalizar Firma"
                    onPress={handleFinish}
                    disabled={!signature}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer: {
        alignItems: 'center',
    },
});

export default SignaturePadPage; 