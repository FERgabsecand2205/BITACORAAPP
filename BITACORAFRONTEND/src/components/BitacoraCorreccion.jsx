import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const BitacoraCorreccion = () => {
    const { folio } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        folio: '',
        fecha: '',
        hora: '',
        tipo: '',
        descripcion: '',
        correccion: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchBitacora = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/bitacoras/${folio}`);
                const bitacora = response.data;
                setFormData({
                    folio: bitacora.folio,
                    fecha: bitacora.fecha,
                    hora: bitacora.hora,
                    tipo: bitacora.tipo,
                    descripcion: bitacora.descripcion,
                    correccion: ''
                });
            } catch (error) {
                console.error('Error fetching bitacora:', error);
                setError('Error al cargar los datos de la bitácora');
            }
        };

        fetchBitacora();
    }, [folio]);

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async () => {
        setError('');
        setSuccessMessage('');

        if (!formData.correccion.trim()) {
            setError('La corrección es requerida');
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:3001/api/bitacora/${folio}/correcciones`, {
                correccion: formData.correccion,
                usuario: 'Usuario' // Esto debería venir de un sistema de autenticación
            });

            setSuccessMessage('Corrección agregada exitosamente');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error submitting correction:', error);
            setError(error.response?.data?.error || 'Error al guardar la corrección');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Agregar Corrección</Text>
            
            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}
            
            {successMessage ? (
                <View style={styles.successContainer}>
                    <Text style={styles.successText}>{successMessage}</Text>
                </View>
            ) : null}

            <View style={styles.formGroup}>
                <Text style={styles.label}>Folio</Text>
                <TextInput
                    style={[styles.input, styles.readOnlyInput]}
                    value={formData.folio}
                    editable={false}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Fecha</Text>
                <TextInput
                    style={[styles.input, styles.readOnlyInput]}
                    value={formData.fecha}
                    editable={false}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Hora</Text>
                <TextInput
                    style={[styles.input, styles.readOnlyInput]}
                    value={formData.hora}
                    editable={false}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Tipo</Text>
                <TextInput
                    style={[styles.input, styles.readOnlyInput]}
                    value={formData.tipo}
                    editable={false}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={[styles.input, styles.readOnlyInput, styles.textArea]}
                    value={formData.descripcion}
                    editable={false}
                    multiline
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Corrección</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.correccion}
                    onChangeText={(text) => handleChange('correccion', text)}
                    placeholder="Ingrese la corrección..."
                    multiline
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => navigate('/')}
                >
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.submitButton]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Guardar Corrección</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    readOnlyInput: {
        backgroundColor: '#f5f5f5',
        color: '#666',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 12,
        borderRadius: 8,
        minWidth: 150,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#e0e0e0',
    },
    submitButton: {
        backgroundColor: '#3b82f6',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    errorContainer: {
        backgroundColor: '#fee2e2',
        borderColor: '#f87171',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        color: '#dc2626',
        fontSize: 14,
    },
    successContainer: {
        backgroundColor: '#dcfce7',
        borderColor: '#4ade80',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    successText: {
        color: '#16a34a',
        fontSize: 14,
    },
});

export default BitacoraCorreccion; 