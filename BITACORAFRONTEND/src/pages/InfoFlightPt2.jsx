import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import SmallButton from '../components/SmallButton';
import SegmentedInput from '../components/SegmentedInput';
import { useNavigate, useLocation } from 'react-router-native';

const InfoFlightPt2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  // Log al recibir el estado de navegación
  React.useEffect(() => {
    console.log('=== InfoFlightPt2 - Al recibir el estado ===');
    console.log('Estado recibido:', location.state);
    console.log('Datos de vuelo recibidos:', location.state?.flightData);
    console.log('Folio recibido:', location.state?.folio);
  }, [location.state]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleSubmit = async (values) => {
    try {
      const folio = location.state?.folio;
      if (!folio) {
        throw new Error('No se encontró el folio de la bitácora');
      }

      console.log('=== InfoFlightPt2 - Antes de actualizar ===');
      console.log('Folio de la bitácora:', folio);
      console.log('Datos a enviar:', values);

      // Actualizar la bitácora
      const response = await fetch(`http://localhost:3001/api/bitacora/${folio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correcciones: [values]
        }),
      });

      console.log('Respuesta del servidor:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar los datos');
      }

      const data = await response.json();
      console.log('=== InfoFlightPt2 - Después de actualizar ===');
      console.log('Datos actualizados:', data);
      
      Alert.alert('Éxito', 'Datos de mantenimiento guardados exitosamente');
      
      console.log('=== InfoFlightPt2 - Antes de navegar ===');
      console.log('Estado a enviar:', {
        flightData: location.state?.flightData,
        maintenanceData: values,
        folio: folio
      });
      
      navigate('/InfoFlightComponents', { 
        state: { 
          flightData: location.state?.flightData,
          maintenanceData: values,
          folio: folio
        } 
      });
    } catch (error) {
      console.error('Error completo:', error);
      Alert.alert('Error', error.message || 'Hubo un problema al guardar los datos');
    }
  };

  return (
    <LayoutScrollViewPage 
      header={<HeaderTitle titleName="Correcciones/Servicios" />}
      body={
        <Formik
          initialValues={{ 
            fecha: date.toISOString().split('T')[0], 
            codigoATA: '', 
            mmReferencia: '', 
            observaciones: '' 
          }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <View style={styles.body}>
              <Text style={styles.subtitle}>
                Correcciones o Servicios de Mantenimiento
              </Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fecha</Text>
                <TextInput
                  style={styles.input}
                  value={values.fecha}
                  onFocus={() => setShow(true)}
                />
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      onChange(event, selectedDate);
                      if (selectedDate) {
                        setFieldValue('fecha', selectedDate.toISOString().split('T')[0]);
                      }
                    }}
                  />
                )}
              </View>
              <SegmentedInput
                label="Código A.T.A. (Air Transport Association)"
                value={values.codigoATA}
                onChangeText={(text) => setFieldValue('codigoATA', text)}
              />
              <View style={styles.inputGroup}>
                <Text style={styles.label}>MM (Referencia Manual de Mantenimiento)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('mmReferencia')}
                  onBlur={handleBlur('mmReferencia')}
                  value={values.mmReferencia}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Observaciones</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('observaciones')}
                  onBlur={handleBlur('observaciones')}
                  value={values.observaciones}
                />
              </View>
              <View style={styles.buttonContainer}>
                <SmallButton 
                  title="Previo"
                  onPress={() => navigate('/InfoFlight')}
                  style={{ backgroundColor: '#3f51b5' }}
                />
                <SmallButton 
                  title="Continuar"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      }
    />
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
  },
  inputGroup: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  }
});

export default InfoFlightPt2;
