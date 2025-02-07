import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import LargeButton from '../components/LargeButton'; // Importar LargeButton
import HeaderTitle from '../components/HeaderTitle'; // Importar HeaderTitle
import LayoutPage from '../components/LayoutPage'; // Importar LayoutPage
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons
import { useNavigate } from 'react-router-native'; // Importar useNavigate

const CreateNew = () => {
  const navigate = useNavigate(); // Inicializar useNavigate

  return (
    <LayoutPage
      header={<HeaderTitle titleName="Crear Nueva Bitacora" />}
      body={
        <Formik
          initialValues={{ nombre: '', apellidos: '', matricula: '', referencia: '' }}
          onSubmit={values => {
            console.log(values);
            // Aquí puedes manejar el envío del formulario
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('nombre')}
                  onBlur={handleBlur('nombre')}
                  value={values.nombre}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Apellidos</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('apellidos')}
                  onBlur={handleBlur('apellidos')}
                  value={values.apellidos}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Matrícula</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('matricula')}
                  onBlur={handleBlur('matricula')}
                  value={values.matricula}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre de Referencia</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('referencia')}
                  onBlur={handleBlur('referencia')}
                  value={values.referencia}
                />
              </View>
              <LargeButton 
                title={
                  <View style={styles.buttonContent}>
                    <Ionicons name="add-circle-outline" size={20} color="white" />
                    <Text style={styles.buttonText}>Continuar</Text>
                  </View>
                } 
                onPress={() => navigate('/newBitacora')}
              />
              <LargeButton 
                title={
                  <View style={styles.buttonContent}>
                    <Ionicons name="close-circle-outline" size={20} color="#414BB2" />
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </View>
                } 
                onPress={() => navigate('/')}
                type="secondary"
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
    width: '100%', // Ocupa el 100% del contenedor
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%', // Ajusta el ancho del contenedor
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 5,
    color: 'white',
  },
  cancelButtonText: {
    marginLeft: 5,
    color: '#414BB2',
  },
});

export default CreateNew;