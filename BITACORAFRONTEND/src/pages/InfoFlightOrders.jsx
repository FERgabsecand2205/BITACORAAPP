import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import DropdownButton from '../components/DropdownButton';
import { useNavigate } from 'react-router-native';

const InfoFlightOrders = () => {
  const navigate = useNavigate();

  return (
    <LayoutScrollViewPage 
      header={<HeaderTitle titleName="Componentes involucrados" />}
      body={
        <Formik
          initialValues={{ 
            ordenTrabajo: '',
            ordenSuministro: '',
            ordenConcentracion: '',
            solicitudComponente: '',
            categoria: ''
          }}
          onSubmit={values => {
            console.log(values);
            navigate('/signatureIssuing');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Orden de trabajo</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('ordenTrabajo')}
                  onBlur={handleBlur('ordenTrabajo')}
                  value={values.ordenTrabajo}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Orden se suministro</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('ordenSuministro')}
                  onBlur={handleBlur('ordenSuministro')}
                  value={values.ordenSuministro}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Orden de concentracion</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('ordenConcentracion')}
                  onBlur={handleBlur('ordenConcentracion')}
                  value={values.ordenConcentracion}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Solicitud de componente</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('solicitudComponente')}
                  onBlur={handleBlur('solicitudComponente')}
                  value={values.solicitudComponente}
                />
              </View>
              <DropdownButton
                title="Categoria"
                onSelect={(option) => setFieldValue('categoria', option)}
              />
              <View style={styles.buttonContainer}>
                <LargeButton 
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
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  }
});

export default InfoFlightOrders; 