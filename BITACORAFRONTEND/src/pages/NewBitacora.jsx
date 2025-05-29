import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-native'; // Importar useNavigate
import LayoutPage from '../components/LayoutPage'; // Importar LayoutPage
import HeaderTitle from '../components/HeaderTitle'; // Importar HeaderTitle
import LargeButton from '../components/LargeButton'; // Importar LargeButton

const validationSchema = Yup.object().shape({
  tipoAeronave: Yup.string()
    .required('El tipo de aeronave es requerido')
    .min(2, 'El tipo de aeronave debe tener al menos 2 caracteres'),
  matricula: Yup.string()
    .required('La matrícula es requerida')
    .matches(
      /^[A-Z0-9-]+$/,
      'La matrícula solo debe contener letras mayúsculas, números y guiones',
    ),
  organismo: Yup.string()
    .required('El organismo es requerido')
    .min(2, 'El organismo debe tener al menos 2 caracteres'),
  folio: Yup.string()
    .required('El folio es requerido')
    .matches(/^\d{4}-\d{3}$/, 'El folio debe tener el formato YYYY-XXX (ejemplo: 2024-001)'),
});

const NewBitacora = () => {
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = async values => {
    try {
      console.log('=== NewBitacora - Intentando crear bitácora ===');
      console.log('Datos a enviar:', values);

<<<<<<< HEAD
      const response = await fetch('https://bitacoraapp.onrender.com/api/bitacora', {
=======
      const response = await fetch('http://localhost:3001/api/bitacora', {
>>>>>>> main
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'Ya existe una bitácora con este folio') {
          Alert.alert(
            'Folio duplicado',
            'El folio que intentas usar ya existe. Por favor, usa un folio diferente.',
            [
              {
                text: 'Entendido',
                style: 'cancel',
              },
            ],
          );
          return;
        }
        throw new Error(errorData.error || 'Error al guardar los datos');
      }

      const data = await response.json();
      console.log('=== NewBitacora - Bitácora creada exitosamente ===');
      console.log('ID recibido del backend:', data._id);
      console.log('Folio:', values.folio);

      Alert.alert('Éxito', 'Bitácora creada exitosamente');
      navigate('/InfoFlight', {
        state: {
          folio: values.folio,
          bitacoraId: data._id,
        },
      });

      console.log('=== NewBitacora - Después de navegar ===');
      console.log('Estado de navegación enviado:', {
        folio: values.folio,
        bitacoraId: data._id,
      });
    } catch (error) {
      console.error('Error completo:', error);
      Alert.alert('Error', error.message || 'Hubo un problema al guardar los datos');
    }
  };

  return (
    <LayoutPage
      header={<HeaderTitle titleName="Nueva Bitácora" />}
      body={
        <Formik
          initialValues={{
            tipoAeronave: '',
            matricula: '',
            organismo: '',
            folio: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Aeronave</Text>
                <TextInput
                  style={[
                    styles.input,
                    touched.tipoAeronave && errors.tipoAeronave && styles.inputError,
                  ]}
                  onChangeText={handleChange('tipoAeronave')}
                  onBlur={handleBlur('tipoAeronave')}
                  value={values.tipoAeronave}
                  placeholder="Ej: Bell 412"
                />
                {touched.tipoAeronave && errors.tipoAeronave && (
                  <Text style={styles.errorText}>{errors.tipoAeronave}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Matrícula</Text>
                <TextInput
                  style={[styles.input, touched.matricula && errors.matricula && styles.inputError]}
                  onChangeText={handleChange('matricula')}
                  onBlur={handleBlur('matricula')}
                  value={values.matricula}
                  placeholder="Ej: 1213"
                />
                {touched.matricula && errors.matricula && (
                  <Text style={styles.errorText}>{errors.matricula}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Organismo</Text>
                <TextInput
                  style={[styles.input, touched.organismo && errors.organismo && styles.inputError]}
                  onChangeText={handleChange('organismo')}
                  onBlur={handleBlur('organismo')}
                  value={values.organismo}
                  placeholder="Ej: SEDENA"
                />
                {touched.organismo && errors.organismo && (
                  <Text style={styles.errorText}>{errors.organismo}</Text>
                )}
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Folio</Text>
                <TextInput
                  style={[styles.input, touched.folio && errors.folio && styles.inputError]}
                  onChangeText={handleChange('folio')}
                  onBlur={handleBlur('folio')}
                  value={values.folio}
                  placeholder="Ej: 2024-001"
                />
                {touched.folio && errors.folio && (
                  <Text style={styles.errorText}>{errors.folio}</Text>
                )}
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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  buttonText: {
    color: 'white',
  },
});

export default NewBitacora;
