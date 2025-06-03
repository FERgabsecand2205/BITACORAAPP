import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import SmallButton from '../components/SmallButton';
import SegmentedInput from '../components/SegmentedInput';
import DatePickerField from '../components/DatePickerField';
import { useNavigate, useLocation } from 'react-router-native';
import { API_URL } from '../utils/api';

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  fechaCorreccion: Yup.string().nullable().optional(),
  codigoATA: Yup.string().nullable().optional(),
  mmReferencia: Yup.string().nullable().optional(),
  observaciones: Yup.string(), // Campo opcional
});

const InfoFlightPt2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Log al recibir el estado de navegación
  React.useEffect(() => {
    console.log('=== InfoFlightPt2 - Al recibir el estado ===');
    console.log('Estado recibido:', location.state);
    console.log('Datos de vuelo recibidos:', location.state?.flightData);
    console.log('Folio recibido:', location.state?.folio);
  }, [location.state]);

  const handleSubmit = async values => {
    try {
      const matricula = location.state?.matricula;
      if (!matricula) {
        throw new Error('No se encontró la matrícula de la bitácora');
      }

      console.log('=== InfoFlightPt2 - Antes de actualizar ===');
      console.log('Matrícula de la bitácora:', matricula);
      console.log('Datos a enviar:', values);

      // Actualizar la bitácora
      const response = await fetch(`${API_URL}/bitacora/${matricula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correcciones: [
            {
              fechaCorreccion: values.fechaCorreccion,
              codigoATA: values.codigoATA,
              mmReferencia: values.mmReferencia,
            },
          ],
          observacionesInfoFlightPt2: values.observaciones,
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
        matricula: matricula,
      });

      navigate('/InfoFlightComponents', {
        state: {
          flightData: location.state?.flightData,
          maintenanceData: values,
          matricula: matricula,
        },
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
            fechaCorreccion: new Date().toISOString().split('T')[0],
            codigoATA: '',
            mmReferencia: '',
            observaciones: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
            <View style={styles.body}>
              <Text style={styles.subtitle}>Correcciones o Servicios de Mantenimiento</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fecha</Text>
                <DatePickerField
                  value={values.fechaCorreccion}
                  onChange={date => setFieldValue('fechaCorreccion', date)}
                />
                {touched.fechaCorreccion && errors.fechaCorreccion && (
                  <Text style={styles.errorText}>{errors.fechaCorreccion}</Text>
                )}
              </View>
              <SegmentedInput
                label="Código A.T.A. (Air Transport Association)"
                value={values.codigoATA}
                onChangeText={text => setFieldValue('codigoATA', text)}
                error={touched.codigoATA && errors.codigoATA}
              />
              {touched.codigoATA && errors.codigoATA && (
                <Text style={styles.errorText}>{errors.codigoATA}</Text>
              )}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>MM (Referencia Manual de Mantenimiento)</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.mmReferencia && errors.mmReferencia && styles.inputError,
                  ]}
                  onChangeText={handleChange('mmReferencia')}
                  onBlur={handleBlur('mmReferencia')}
                  value={values.mmReferencia}
                />
                {touched.mmReferencia && errors.mmReferencia && (
                  <Text style={styles.errorText}>{errors.mmReferencia}</Text>
                )}
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
                  onPress={() =>
                    navigate('/InfoFlight', {
                      state: {
                        matricula: location.state?.matricula,
                        flightData: location.state?.flightData,
                        isEditing: true,
                      },
                    })
                  }
                  style={{ backgroundColor: '#3f51b5' }}
                />
                <SmallButton title="Continuar" onPress={handleSubmit} />
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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});

export default InfoFlightPt2;
