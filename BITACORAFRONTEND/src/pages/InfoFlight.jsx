import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import DropdownButton from '../components/DropdownButton';
import { useNavigate, useLocation } from 'react-router-native';

const InfoFlight = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  // Agregar log al recibir el estado de navegación
  React.useEffect(() => {
    console.log('=== InfoFlight - Al recibir el estado ===');
    console.log('Estado recibido:', location.state);
    console.log('ID de la bitácora recibido:', location.state?.bitacoraId);
    console.log('Folio recibido:', location.state?.folio);
  }, [location.state]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleSubmit = async (values) => {
    try {
      // Obtener el folio de la bitácora desde el estado de navegación
      const folio = location.state?.folio;
      if (!folio) {
        throw new Error('No se encontró el folio de la bitácora');
      }

      console.log('=== InfoFlight - Antes de actualizar ===');
      console.log('Folio de la bitácora:', folio);
      console.log('Datos a enviar:', values);

      // Actualizar la bitácora usando el folio
      const response = await fetch(`http://localhost:3001/api/bitacora/${folio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      console.log('Respuesta del servidor:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar los datos');
      }

      const data = await response.json();
      console.log('=== InfoFlight - Después de actualizar ===');
      console.log('Datos actualizados:', data);
      
      Alert.alert('Éxito', 'Datos de vuelo guardados exitosamente');
      
      console.log('=== InfoFlight - Antes de navegar ===');
      console.log('Estado a enviar:', {
        flightData: values,
        folio: folio
      });
      
      navigate('/InfoFlightPt2', { 
        state: { 
          flightData: values,
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
      header={<HeaderTitle titleName="Información de Vuelo" />}
      body={
        <Formik
          initialValues={{
            lugarSalida: '',
            lugarLlegada: '',
            tipoVuelo: '',
            eventosTorque: '',
            cargaAceiteMotores: '',
            cargaAceiteAPU: '',
            fecha: date.toISOString().split('T')[0],
            categoria: '',
            observaciones: ''
          }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Lugar de Salida</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    console.log('Lugar de Salida cambiado:', text);
                    handleChange('lugarSalida')(text);
                  }}
                  onBlur={handleBlur('lugarSalida')}
                  value={values.lugarSalida}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Lugar de Llegada</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('lugarLlegada')}
                  onBlur={handleBlur('lugarLlegada')}
                  value={values.lugarLlegada}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Vuelo</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('tipoVuelo')}
                  onBlur={handleBlur('tipoVuelo')}
                  value={values.tipoVuelo}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Eventos de Torque</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('eventosTorque')}
                  onBlur={handleBlur('eventosTorque')}
                  value={values.eventosTorque}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Carga Aceite Motores</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('cargaAceiteMotores')}
                  onBlur={handleBlur('cargaAceiteMotores')}
                  value={values.cargaAceiteMotores}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Carga Aceite A.P.U.</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('cargaAceiteAPU')}
                  onBlur={handleBlur('cargaAceiteAPU')}
                  value={values.cargaAceiteAPU}
                />
              </View>
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
                        const formattedDate = selectedDate.toISOString().split('T')[0];
                        console.log('Fecha seleccionada:', formattedDate);
                        setFieldValue('fecha', formattedDate);
                      }
                    }}
                  />
                )}
              </View>
              <DropdownButton
                title="Categoria"
                onSelect={(option) => {
                  console.log('Categoría seleccionada:', option);
                  setFieldValue('categoria', option);
                }}
              />
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Observaciones</Text>
                <TextInput
                  style={[styles.input, styles.observacionesInput]}
                  onChangeText={handleChange('observaciones')}
                  onBlur={handleBlur('observaciones')}
                  value={values.observaciones}
                  multiline={true}
                  numberOfLines={3}
                />
              </View>
              <LargeButton 
                title={<Text style={styles.buttonText}>Continuar</Text>} 
                onPress={() => {
                  console.log('Valores del formulario antes de enviar:', values);
                  handleSubmit();
                }} 
              />
            </View>
          )}
        </Formik>
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
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  inputGroup: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    width: '100%',
  },
  observacionesInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 8
  },
  buttonText: {
    color: 'white',
  },
});

export default InfoFlight;
