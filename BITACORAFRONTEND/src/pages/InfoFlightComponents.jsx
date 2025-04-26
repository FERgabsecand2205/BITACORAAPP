import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import SmallButton from '../components/SmallButton';
import { useNavigate, useLocation } from 'react-router-native';

const InfoFlightComponents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [componentCount, setComponentCount] = useState(1);
  const [components, setComponents] = useState([]);

  // Inicializar o recuperar el contador y componentes
  useEffect(() => {
    if (location.state?.componentCount) {
      setComponentCount(location.state.componentCount);
    }
    if (location.state?.components) {
      setComponents(location.state.components);
    }
  }, [location.state]);

  const handleCreate = (values) => {
    if (componentCount < 3) {
      // Log del componente actual
      console.log(`Componente ${componentCount} guardado:`, values);
      
      const updatedComponents = [...components, values];
      console.log('Lista actualizada de componentes:', updatedComponents);
      
      navigate('/InfoFlightComponents', {
        state: {
          components: updatedComponents,
          componentCount: componentCount + 1,
          previousData: location.state?.previousData
        },
        replace: true
      });
    }
  };

  const handleContinue = (values) => {
    // Log del último componente y todos los componentes
    console.log(`Componente ${componentCount} (final) guardado:`, values);
    
    const allComponents = [...components, values];
    console.log('Todos los componentes guardados:', allComponents);
    
    // Log de todos los datos acumulados
    console.log('Datos completos:', {
      componentData: allComponents,
      previousData: location.state?.previousData
    });

    navigate('/InfoFlightOrders', {
      state: {
        componentData: allComponents,
        previousData: location.state?.previousData
      }
    });
  };

  const handleSubmit = (values) => {
    // Log de los valores del formulario actual
    console.log('Valores del formulario actual:', values);
    
    if (componentCount < 3) {
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
            nomenclatura: ''
          }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>N/P (Numero de partes del componente afectado)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('numeroParte')}
                  onBlur={handleBlur('numeroParte')}
                  value={values.numeroParte}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>POS (Posición del componente afectado)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('posicion')}
                  onBlur={handleBlur('posicion')}
                  value={values.posicion}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>N/S OFF (Numero de serie del componente afectado)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('numeroSerieOFF')}
                  onBlur={handleBlur('numeroSerieOFF')}
                  value={values.numeroSerieOFF}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>N/S ON (Numero de serie del componente instalado)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('numeroSerieON')}
                  onBlur={handleBlur('numeroSerieON')}
                  value={values.numeroSerieON}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nomenclatura</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('nomenclatura')}
                  onBlur={handleBlur('nomenclatura')}
                  value={values.nomenclatura}
                />
              </View>
              <View style={styles.noteContainer}>
                <Text style={styles.noteText}>
                  En caso de ser mas de un componente, se debe repetir el formulario dando click en el botón{' '}
                  <Text style={styles.highlightedText}>Crear</Text>
                  {' '}para crear un nuevo componente
                </Text>
                <Text style={styles.componentCounter}>
                  Componente {componentCount} de 3
                </Text>
                {componentCount > 1 && (
                  <Text style={styles.savedComponentsText}>
                    Componentes guardados: {components.length}
                  </Text>
                )}
              </View>
              <View style={styles.buttonContainer}>
                <SmallButton 
                  title="Crear"
                  onPress={handleSubmit}
                  style={[
                    { backgroundColor: '#3f51b5' },
                    componentCount >= 3 && styles.disabledButton
                  ]}
                  disabled={componentCount >= 3}
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
  disabledButton: {
    backgroundColor: '#9e9e9e',
    opacity: 0.7,
  }
});

export default InfoFlightComponents; 