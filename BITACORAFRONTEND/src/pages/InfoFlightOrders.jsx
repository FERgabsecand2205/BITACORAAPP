import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import DropdownButton from '../components/DropdownButton';
import { useNavigate, useLocation } from 'react-router-native';

const API_URL = 'http://localhost:3001/api';

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  ordenTrabajo: Yup.string().nullable().optional(),
  ordenSuministro: Yup.string().nullable().optional(),
  ordenConcentracion: Yup.string().nullable().optional(),
  solicitudComponente: Yup.string().nullable().optional(),
  categoriaInfoFlightOrders: Yup.string().nullable().optional(),
});

const InfoFlightOrders = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Log al recibir el estado
  React.useEffect(() => {
    console.log('=== InfoFlightOrders - Estado inicial ===');
    console.log('Estado completo recibido:', location.state);
    console.log('Matrícula recibida:', location.state?.matricula);
    console.log('Datos de componentes:', location.state?.componentData);
    console.log('Datos de vuelo:', location.state?.flightData);
    console.log('Datos de mantenimiento:', location.state?.maintenanceData);
  }, [location.state]);

  const handleSubmit = async values => {
    try {
      const matricula = location.state?.matricula;
      if (!matricula) {
        console.error('Error: No se encontró la matrícula en el estado:', location.state);
        throw new Error('No se encontró la matrícula de la bitácora');
      }

      console.log('=== InfoFlightOrders - Antes de actualizar ===');
      console.log('Matrícula de la bitácora:', matricula);
      console.log('Datos a enviar:', values);
      console.log('Estado actual completo:', location.state);

      // Actualizar la bitácora con los datos de órdenes
      const response = await fetch(`${API_URL}/bitacora/${matricula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ordenTrabajo: values.ordenTrabajo,
          ordenSuministro: values.ordenSuministro,
          ordenConcentracion: values.ordenConcentracion,
          solicitudComponente: values.solicitudComponente,
          categoriaInfoFlightOrders: values.categoriaInfoFlightOrders,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        throw new Error('Error al actualizar los datos de órdenes');
      }

      const result = await response.json();
      console.log('=== InfoFlightOrders - Después de actualizar ===');
      console.log('Respuesta completa del servidor:', result);
      console.log('Datos de la bitácora actualizados:', result.bitacora);

      // Verificar que los datos se hayan guardado correctamente
      const updatedFields = {
        ordenTrabajo: result.bitacora.ordenTrabajo,
        ordenSuministro: result.bitacora.ordenSuministro,
        ordenConcentracion: result.bitacora.ordenConcentracion,
        solicitudComponente: result.bitacora.solicitudComponente,
        categoria: result.bitacora.categoria,
      };

      console.log('Campos actualizados en la base de datos:', updatedFields);

      // Preparar el estado para la siguiente página
      const nextState = {
        ...location.state,
        ordersData: values,
        bitacoraId: result.bitacora._id,
        formData: {
          ...location.state?.formData,
          ordersData: values,
        },
      };

      console.log('=== InfoFlightOrders - Estado final ===');
      console.log('Estado a enviar a la siguiente página:', nextState);
      console.log('BitacoraId a enviar:', result.bitacora._id);

      // Navegar a la página de firma
      navigate('/signatureIssuing', { state: nextState });
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      Alert.alert(
        'Error',
        error.message ||
          'Hubo un error al guardar los datos de órdenes. Por favor, intente nuevamente.',
      );
    }
  };

  return (
    <LayoutScrollViewPage
      header={<HeaderTitle titleName="Órdenes y Solicitudes" />}
      body={
        <Formik
          initialValues={{
            ordenTrabajo: '',
            ordenSuministro: '',
            ordenConcentracion: '',
            solicitudComponente: '',
            categoriaInfoFlightOrders: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Orden de trabajo</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.ordenTrabajo && errors.ordenTrabajo && styles.inputError,
                  ]}
                  onChangeText={handleChange('ordenTrabajo')}
                  onBlur={handleBlur('ordenTrabajo')}
                  value={values.ordenTrabajo}
                />
                {touched.ordenTrabajo && errors.ordenTrabajo && (
                  <Text style={styles.errorText}>{errors.ordenTrabajo}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Orden de suministro</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.ordenSuministro && errors.ordenSuministro && styles.inputError,
                  ]}
                  onChangeText={handleChange('ordenSuministro')}
                  onBlur={handleBlur('ordenSuministro')}
                  value={values.ordenSuministro}
                />
                {touched.ordenSuministro && errors.ordenSuministro && (
                  <Text style={styles.errorText}>{errors.ordenSuministro}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Orden de concentración</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.ordenConcentracion && errors.ordenConcentracion && styles.inputError,
                  ]}
                  onChangeText={handleChange('ordenConcentracion')}
                  onBlur={handleBlur('ordenConcentracion')}
                  value={values.ordenConcentracion}
                />
                {touched.ordenConcentracion && errors.ordenConcentracion && (
                  <Text style={styles.errorText}>{errors.ordenConcentracion}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Solicitud de componente</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.solicitudComponente && errors.solicitudComponente && styles.inputError,
                  ]}
                  onChangeText={handleChange('solicitudComponente')}
                  onBlur={handleBlur('solicitudComponente')}
                  value={values.solicitudComponente}
                />
                {touched.solicitudComponente && errors.solicitudComponente && (
                  <Text style={styles.errorText}>{errors.solicitudComponente}</Text>
                )}
              </View>
              <DropdownButton
                title="Categoría"
                onSelect={option => {
                  console.log('Categoría seleccionada:', option);
                  setFieldValue('categoriaInfoFlightOrders', option);
                }}
              />
              {touched.categoriaInfoFlightOrders && errors.categoriaInfoFlightOrders && (
                <Text style={styles.errorText}>{errors.categoriaInfoFlightOrders}</Text>
              )}
              <View style={styles.buttonContainer}>
                <LargeButton
                  title="Continuar"
                  onPress={() => {
                    console.log('Valores del formulario antes de enviar:', values);
                    handleSubmit();
                  }}
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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default InfoFlightOrders;
