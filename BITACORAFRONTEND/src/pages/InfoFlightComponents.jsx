import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import SmallButton from '../components/SmallButton';
import { useNavigate, useLocation } from 'react-router-native';

const API_URL = 'https://bitacoraapp.onrender.com/api';

const InfoFlightComponents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [componentCount, setComponentCount] = useState(1);
  const [components, setComponents] = useState([]);

  // Inicializar o recuperar el contador y componentes
  useEffect(() => {
    console.log('=== InfoFlightComponents - Estado inicial ===');
    console.log('Estado completo recibido:', location.state);
    
    if (location.state?.componentCount) {
      setComponentCount(location.state.componentCount);
    }
    if (location.state?.components) {
      setComponents(location.state.components);
    }
  }, [location.state]);

  const handleCreate = values => {
    if (componentCount < 3) {
      console.log(`=== InfoFlightComponents - Creando componente ${componentCount} ===`);
      console.log('Valores del componente:', values);

      // Validar que no excedamos el límite de 3 componentes
      if (components.length >= 2) {
        Alert.alert('Error', 'No se pueden agregar más de 3 componentes');
        return;
      }

      const updatedComponents = [...components, values];
      console.log('Lista actualizada de componentes:', updatedComponents);

      const newState = {
        components: updatedComponents,
        componentCount: componentCount + 1,
        folio: location.state?.folio,
        flightData: location.state?.flightData,
        maintenanceData: location.state?.maintenanceData,
      };
      console.log('Nuevo estado a enviar:', newState);

      navigate('/InfoFlightComponents', {
        state: newState,
        replace: true,
      });
    }
  };

  const handleContinue = async values => {
    try {
      console.log('=== InfoFlightComponents - Continuando con el último componente ===');
      console.log('Valores del último componente:', values);

      const allComponents = [...components, values];
      console.log('Todos los componentes guardados:', allComponents);

      // Validar que tengamos al menos un componente
      if (allComponents.length === 0) {
        throw new Error('Debe agregar al menos un componente');
      }

      // Obtener el folio del estado
      const folio = location.state?.folio;
      console.log('Folio obtenido del estado:', folio);

      if (!folio) {
        console.error('Estado actual:', location.state);
        throw new Error('No se encontró el folio de la bitácora');
      }

      console.log('=== InfoFlightComponents - Enviando datos al servidor ===');
      console.log('URL:', `${API_URL}/bitacora/${folio}`);
      console.log('Datos a enviar:', { componentes: allComponents });

      // Actualizar la bitácora con los componentes
      const response = await fetch(`${API_URL}/bitacora/${folio}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          componentes: allComponents,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.message || 'Error al actualizar los componentes');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      // Navegar a la siguiente página con los datos actualizados
      const nextState = {
        componentData: allComponents,
        folio: folio,
        flightData: location.state?.flightData,
        maintenanceData: location.state?.maintenanceData,
      };
      console.log('Estado a enviar a la siguiente página:', nextState);

      navigate('/InfoFlightOrders', { state: nextState });
    } catch (error) {
      console.error('Error en handleContinue:', error);
      Alert.alert(
        'Error',
        error.message || 'Hubo un error al guardar los componentes. Por favor, intente nuevamente.',
      );
    }
  };

  const handleSubmit = (values, action) => {
    console.log('=== InfoFlightComponents - Enviando formulario ===');
    console.log('Valores del formulario actual:', values);
    console.log('Contador de componentes:', componentCount);
    console.log('Acción seleccionada:', action);

    if (action === 'create') {
      handleCreate(values);
    } else {
      handleContinue(values);
    }
  };

  return (
    <LayoutScrollViewPage
      header={<HeaderTitle titleName="Componentes involucrados" />}
      body={
        <Formik
          initialValues={{
            numeroParte: '',
            posicion: '',
            numeroSerieOFF: '',
            numeroSerieON: '',
            nomenclatura: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Este onSubmit no se usa directamente
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>N/P (Numero de partes del componente afectado)</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.numeroParte && errors.numeroParte && styles.inputError,
                  ]}
                  onChangeText={handleChange('numeroParte')}
                  onBlur={handleBlur('numeroParte')}
                  value={values.numeroParte}
                />
                {touched.numeroParte && errors.numeroParte && (
                  <Text style={styles.errorText}>{errors.numeroParte}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>POS (Posición del componente afectado)</Text>
                <TextInput
                  style={[styles.input, touched.posicion && errors.posicion && styles.inputError]}
                  onChangeText={handleChange('posicion')}
                  onBlur={handleBlur('posicion')}
                  value={values.posicion}
                />
                {touched.posicion && errors.posicion && (
                  <Text style={styles.errorText}>{errors.posicion}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>N/S OFF (Numero de serie del componente afectado)</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.numeroSerieOFF && errors.numeroSerieOFF && styles.inputError,
                  ]}
                  onChangeText={handleChange('numeroSerieOFF')}
                  onBlur={handleBlur('numeroSerieOFF')}
                  value={values.numeroSerieOFF}
                />
                {touched.numeroSerieOFF && errors.numeroSerieOFF && (
                  <Text style={styles.errorText}>{errors.numeroSerieOFF}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>N/S ON (Numero de serie del componente instalado)</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.numeroSerieON && errors.numeroSerieON && styles.inputError,
                  ]}
                  onChangeText={handleChange('numeroSerieON')}
                  onBlur={handleBlur('numeroSerieON')}
                  value={values.numeroSerieON}
                />
                {touched.numeroSerieON && errors.numeroSerieON && (
                  <Text style={styles.errorText}>{errors.numeroSerieON}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nomenclatura</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.nomenclatura && errors.nomenclatura && styles.inputError,
                  ]}
                  onChangeText={handleChange('nomenclatura')}
                  onBlur={handleBlur('nomenclatura')}
                  value={values.nomenclatura}
                />
                {touched.nomenclatura && errors.nomenclatura && (
                  <Text style={styles.errorText}>{errors.nomenclatura}</Text>
                )}
              </View>
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>
                  En caso de ser mas de un componente, se debe repetir el formulario dando click en
                  el botón <Text style={styles.highlightedText}>Crear</Text> para crear un nuevo
                  componente
                </Text>
                <Text style={styles.componentCounter}>Componente {componentCount} de 3</Text>
                {componentCount > 1 && (
                  <Text style={styles.savedComponentsText}>
                    Componentes guardados: {components.length}
                  </Text>
                )}
              </View>
              <View style={styles.buttonContainer}>
                {componentCount < 3 && (
                  <SmallButton
                    title="Crear"
                    onPress={() => handleSubmit(values, 'create')}
                    style={{ backgroundColor: '#3f51b5' }}
                  />
                )}
                <SmallButton
                  title="Continuar"
                  onPress={() => handleSubmit(values, 'continue')}
                  style={{ backgroundColor: '#4CAF50' }}
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
  noteContainer: {
    marginVertical: 10,
    width: '100%',
  },
  noteText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  highlightedText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  componentCounter: {
    textAlign: 'center',
    marginTop: 5,
    color: '#3f51b5',
    fontWeight: 'bold',
  },
  savedComponentsText: {
    textAlign: 'center',
    marginTop: 5,
    color: '#4CAF50',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});

export default InfoFlightComponents;
