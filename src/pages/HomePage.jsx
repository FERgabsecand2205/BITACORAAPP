import React, { useEffect } from 'react';
import { View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons
import { styles } from '../themesBitacora';
import LargeButton from '../components/LargeButton'; // Importar LargeButton
import HeaderTitle from '../components/HeaderTitle'; // Importar HeaderTitle
import LayoutPage from '../components/LayoutPage'; // Importar LayoutPage

// Función para convertir horas a segundos
const convertHoursToSeconds = (hours) => {
    const [h, m, s] = hours.split(':').map(Number);
    return h * 3600 + m * 60 + s;
};

const BitacoraStatus = ({ iconColor, bitacoraName, bitacoraState, bitacoraHours }) => {
    // Determinar el color del icono basado en bitacoraHours si no se proporciona iconColor
    const hoursInSeconds = convertHoursToSeconds(bitacoraHours);
    const calculatedIconColor = iconColor || (
        hoursInSeconds <= 288000 ? 'green' : 
        hoursInSeconds <= 324000 ? 'orange' : 
        'red'
    );

    useEffect(() => {
        if (hoursInSeconds > 324000) {
            Alert.alert(
                "Advertencia",
                "Se aproxima el mantenimiento de 100 Hrs de vuelo de esta aeronave",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
        }
    }, [hoursInSeconds]);

    return (
        <View style={pageStyles.bitacoraContainer}>
            <Ionicons name="document" size={50} color={calculatedIconColor} style={pageStyles.marginDocument} />
            <View style={pageStyles.bitacoraTextContainer}>
                <Text style={pageStyles.bitacoraTextTitle}>{bitacoraName}</Text>
                <Text style={pageStyles.bitacoraText}>Estado: {bitacoraState}</Text>
                <Text style={pageStyles.bitacoraText}>Hrs: {bitacoraHours}</Text>
            </View>
        </View>
    );
};

const HomePage = () => {
    const navigate = useNavigate(); 
    return (
        <LayoutPage
            header={<HeaderTitle titleName="Bitácora de Aeronaves" />}
            body={
                <View style={pageStyles.bodyContent}>
                    <BitacoraStatus 
                        bitacoraName="Bell 412 Mat.1213" 
                        bitacoraState="Operativo" 
                        bitacoraHours="64:25:42" 
                    />
                    <BitacoraStatus 
                        bitacoraName="Bell 412 Mat.1122" 
                        bitacoraState="En mantenimiento" 
                        bitacoraHours="75:25:56" 
                    />
                    <BitacoraStatus 
                        bitacoraName="Bell 412 Mat.1625" 
                        bitacoraState="Sin novedad" 
                        bitacoraHours="80:52:42" 
                    />
                    <BitacoraStatus 
                        bitacoraName="Bell 412 Mat.1017" 
                        bitacoraState="Sin novedad" 
                        bitacoraHours="85:25:50" 
                    />
                </View>
            }
            buttons={
                <>
                    <LargeButton title="Comenzar Nueva Bitácora" 
                        onPress={() => {
                            navigate('/createnewbitacora');
                        }} />
                    <LargeButton title="Administrar Todas las Actividades" 
                        onPress={() => {
                            navigate('/adminallactivities');
                        }} />    
                </>
  
            }
            footer={<View style={pageStyles.footer}></View>}
        />
    );
};

const pageStyles = StyleSheet.create({
    bitacoraTextTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bitacoraContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    bitacoraTextContainer: {
        flex: 1,
    },
    bitacoraText: {
        fontSize: 14,
        marginVertical: 5,
    },
    marginDocument: {
        marginRight: '10%',
        marginLeft: '5%',
    },
    bodyContent: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        marginTop: 20,
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomePage;
