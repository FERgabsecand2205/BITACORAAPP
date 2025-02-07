import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import LayoutPage from '../components/LayoutPage'; // Importar LayoutPage
import HeaderTitle from '../components/HeaderTitle'; // Importar HeaderTitle
import LargeButton from '../components/LargeButton'; // Importar LargeButton

const NewBitacora = () => {
  return (
    <LayoutPage
      header={<HeaderTitle titleName="Bitácora de Mantenimiento" />}
      body={
        <Formik
          initialValues={{ tipoAeronave: '', matricula: '', organismo: '', folio: '' }}
          onSubmit={values => {
            console.log(values);
            // Aquí puedes manejar el envío del formulario
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Aeronave</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('tipoAeronave')}
                  onBlur={handleBlur('tipoAeronave')}
                  value={values.tipoAeronave}
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
                <Text style={styles.label}>Organismo</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('organismo')}
                  onBlur={handleBlur('organismo')}
                  value={values.organismo}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Folio</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('folio')}
                  onBlur={handleBlur('folio')}
                  value={values.folio}
                />
              </View>
              <LargeButton 
                title={<Text style={styles.buttonText}>Continuar</Text>} 
                onPress={handleSubmit} 
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
    width: '80%', // Ajusta el ancho del contenedor
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
    width: '100%', // Ocupa el 100% del contenedor
  },
  buttonText: {
    color: 'white',
  },
});

export default NewBitacora;
