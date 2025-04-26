import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import { useNavigate } from 'react-router-native';

const SignatureDoer = () => {
  const navigate = useNavigate();

  return (
    <LayoutScrollViewPage 
      header={<HeaderTitle titleName="Datos de quien realizo las acciones" />}
      body={
        <Formik
          initialValues={{ 
            grado: '',
            nombre: '',
            matricula: '',
            firma: '',
            mel: ''
          }}
          onSubmit={values => {
            console.log(values);
            navigate('/signatureDelivery');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Grado*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('grado')}
                  onBlur={handleBlur('grado')}
                  value={values.grado}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('nombre')}
                  onBlur={handleBlur('nombre')}
                  value={values.nombre}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Matricula*</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('matricula')}
                  onBlur={handleBlur('matricula')}
                  value={values.matricula}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Firma*</Text>
                <TextInput
                  style={styles.largeInput}
                  onChangeText={handleChange('firma')}
                  onBlur={handleBlur('firma')}
                  value={values.firma}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>MEL (Lista de Equipo mínimo)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('mel')}
                  onBlur={handleBlur('mel')}
                  value={values.mel}
                />
              </View>
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
    marginBottom: 15,
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
    borderRadius: 4,
    paddingLeft: 8,
    width: '100%',
  },
  largeInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    width: '100%',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  }
});

export default SignatureDoer; 