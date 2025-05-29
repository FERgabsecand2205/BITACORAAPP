import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import DropdownButton from '../components/DropdownButton';
import DatePickerField from '../components/DatePickerField';
import { useNavigate, useLocation } from 'react-router-native';

const validationSchema = Yup.object().shape({
  lugarSalida: Yup.string()
    .required('El lugar de salida es requerido')
    .min(2, 'El lugar de salida debe tener al menos 2 caracteres'),
  lugarLlegada: Yup.string()
    .required('El lugar de llegada es requerido')
    .min(2, 'El lugar de llegada debe tener al menos 2 caracteres'),
  tipoVuelo: Yup.string()
    .required('El tipo de vuelo es requerido')
    .min(2, 'El tipo de vuelo debe tener al menos 2 caracteres'),
  eventosTorque: Yup.string().required('Los eventos de torque son requeridos'),
  cargaAceiteMotores: Yup.string()
    .required('La carga de aceite de motores es requerida')
    .matches(/^\d+(\.\d+)?$/, 'Debe ser un número válido'),
  cargaAceiteAPU: Yup.string()
    .required('La carga de aceite APU es requerida')
    .matches(/^\d+(\.\d+)?$/, 'Debe ser un número válido'),
  fechaInfoFlight: Yup.string()
    .required('La fecha es requerida')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener el formato YYYY-MM-DD'),
  categoria: Yup.string().required('La categoría es requerida'),
  observaciones: Yup.string().max(500, 'Las observaciones no pueden exceder los 500 caracteres'),
});

const InfoFlight = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [date] = React.useState(new Date());

  // Agregar log al recibir el estado de navegación
  React.useEffect(() => {
    console.log('=== InfoFlight - Al recibir el estado ===');
    console.log('Estado recibido:', location.state);
    console.log('ID de la bitácora recibido:', location.state?.bitacoraId);
    console.log('Folio recibido:', location.state?.folio);
  }, [location.state]);

  const handleSubmit = async values => {

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

        body: JSON.stringify({
          ...values,
          observacionesInfoFlight: values.observaciones,
        }),
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
        folio: folio,
      });

      navigate('/InfoFlightPt2', {
        state: {
          flightData: values,
          folio: folio,
        },

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
            fechaInfoFlight: date.toISOString().split('T')[0],
            categoria: '',
            observaciones: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Lugar de Salida</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.lugarSalida && errors.lugarSalida && styles.inputError,
                  ]}
                  onChangeText={text => {
                    handleChange('lugarSalida')(text);
                  }}
                  onBlur={handleBlur('lugarSalida')}
                  value={values.lugarSalida}
                />
                {touched.lugarSalida && errors.lugarSalida && (
                  <Text style={styles.errorText}>{errors.lugarSalida}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Lugar de Llegada</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.lugarLlegada && errors.lugarLlegada && styles.inputError,
                  ]}
                  onChangeText={handleChange('lugarLlegada')}
                  onBlur={handleBlur('lugarLlegada')}
                  value={values.lugarLlegada}
                />
                {touched.lugarLlegada && errors.lugarLlegada && (
                  <Text style={styles.errorText}>{errors.lugarLlegada}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Vuelo</Text>
                <TextInput
                  style={[styles.input, touched.tipoVuelo && errors.tipoVuelo && styles.inputError]}
                  onChangeText={handleChange('tipoVuelo')}
                  onBlur={handleBlur('tipoVuelo')}
                  value={values.tipoVuelo}
                />
                {touched.tipoVuelo && errors.tipoVuelo && (
                  <Text style={styles.errorText}>{errors.tipoVuelo}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Eventos de Torque</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.eventosTorque && errors.eventosTorque && styles.inputError,
                  ]}
                  onChangeText={handleChange('eventosTorque')}
                  onBlur={handleBlur('eventosTorque')}
                  value={values.eventosTorque}
                />
                {touched.eventosTorque && errors.eventosTorque && (
                  <Text style={styles.errorText}>{errors.eventosTorque}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Carga Aceite Motores</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.cargaAceiteMotores && errors.cargaAceiteMotores && styles.inputError,
                  ]}
                  onChangeText={handleChange('cargaAceiteMotores')}
                  onBlur={handleBlur('cargaAceiteMotores')}
                  value={values.cargaAceiteMotores}
                />
                {touched.cargaAceiteMotores && errors.cargaAceiteMotores && (
                  <Text style={styles.errorText}>{errors.cargaAceiteMotores}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Carga Aceite A.P.U.</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.cargaAceiteAPU && errors.cargaAceiteAPU && styles.inputError,
                  ]}
                  onChangeText={handleChange('cargaAceiteAPU')}
                  onBlur={handleBlur('cargaAceiteAPU')}
                  value={values.cargaAceiteAPU}
                />
                {touched.cargaAceiteAPU && errors.cargaAceiteAPU && (
                  <Text style={styles.errorText}>{errors.cargaAceiteAPU}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fecha</Text>
                <DatePickerField
                  value={values.fechaInfoFlight}
                  onChange={value => setFieldValue('fechaInfoFlight', value)}
                  error={touched.fechaInfoFlight && errors.fechaInfoFlight}
                  touched={touched.fechaInfoFlight}
                />
                {touched.fechaInfoFlight && errors.fechaInfoFlight && (
                  <Text style={styles.errorText}>{errors.fechaInfoFlight}</Text>
                )}
              </View>
              <DropdownButton
                title="Categoria"
                onSelect={option => {
                  console.log('Categoría seleccionada:', option);
                  setFieldValue('categoria', option);
                }}
                error={touched.categoria && errors.categoria}
              />
              {touched.categoria && errors.categoria && (
                <Text style={styles.errorText}>{errors.categoria}</Text>
              )}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Observaciones</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.observacionesInput,
                    touched.observaciones && errors.observaciones && styles.inputError,
                  ]}
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
    paddingTop: 8,
  },
  buttonText: {
    color: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});

export default InfoFlight;
