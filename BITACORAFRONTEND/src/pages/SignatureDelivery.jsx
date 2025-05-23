import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import { useNavigate, useLocation } from 'react-router-native';
import '../styles/SignatureDelivery.css';

const API_URL = 'http://localhost:3001/api';

const validationSchema = Yup.object().shape({
  grado: Yup.string().required('El grado es requerido'),
  nombre: Yup.string().required('El nombre es requerido'),
  matricula: Yup.string().required('La matrícula es requerida'),
});

const SignatureDelivery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signatureImage, setSignatureImage] = useState(null);
  const [bitacoraId, setBitacoraId] = useState(null);
  const [error, setError] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState({
    grado: '',
    nombre: '',
    matricula: '',
  });

  useEffect(() => {
    console.log('=== SignatureDelivery - useEffect ===');
    console.log('Estado de navegación:', location.state);
    if (location.state) {
      // Si recibimos un bitacoraId, actualizarlo
      if (location.state.bitacoraId) {
        console.log('BitacoraId recibido:', location.state.bitacoraId);
        setBitacoraId(location.state.bitacoraId);
      }

      // Si recibimos una firma, actualizarla
      if (location.state.signature) {
        console.log('Firma recibida del estado');
        setSignatureImage(location.state.signature);
      }

      // Si recibimos formData, actualizar los valores iniciales
      if (location.state.formData) {
        console.log('Actualizando valores del formulario desde formData');
        setInitialFormValues(location.state.formData);
      }
    }
  }, [location.state]);

  const handleSignatureComplete = signature => {
    console.log('=== SignatureDelivery - handleSignatureComplete ===');
    console.log('Firma recibida:', signature ? 'Presente' : 'No presente');
    if (signature) {
      console.log('Firma capturada:', signature.substring(0, 50) + '...');
      setSignatureImage(signature);
    }
  };

  const handleNavigateToSignaturePad = formValues => {
    console.log('=== SignatureDelivery - Navegando a SignaturePad ===');
    console.log('Callback disponible:', location.state?.onSignatureComplete ? 'Sí' : 'No');
    console.log('Valores del formulario a mantener:', formValues);
    navigate('/signature-pad', {
      state: {
        returnTo: '/signatureDelivery',
        bitacoraId: bitacoraId,
        formData: formValues,
        onSignatureComplete: handleSignatureComplete,
      },
    });
  };

  const handleSubmit = async values => {
    console.log('=== SignatureDelivery - handleSubmit ===');
    console.log('Valores del formulario:', values);
    console.log('Imagen de firma:', signatureImage ? 'Presente' : 'No presente');
    console.log('BitacoraId a enviar:', bitacoraId);

    if (!bitacoraId) {
      setError('No se encontró el ID de la bitácora');
      return;
    }

    if (!signatureImage) {
      setError('La firma es requerida');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/bitacora/signature-delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          firma: {
            data: signatureImage,
            type: 'image/png',
          },
          bitacoraId: bitacoraId,
        }),
      });

      console.log('Respuesta del servidor - Status:', response.status);
      const data = await response.json();
      console.log('Respuesta del servidor - Data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Error al guardar la firma');
      }

      console.log('=== SignatureDelivery - Navegando a Comments ===');
      console.log('Estado a enviar:', {
        bitacoraId: bitacoraId,
      });

      // Navegar a Comments con los datos necesarios
      navigate('/comments', {
        state: {
          bitacoraId: bitacoraId,
        },
      });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      setError(error.message);
    }
  };

  return (
    <LayoutScrollViewPage
      header={<HeaderTitle titleName="Datos de quien entrega aeronave" />}
      body={
        <View style={styles.body}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Grado*</Text>
                  <TextInput
                    style={[styles.input, errors.grado && touched.grado && styles.inputError]}
                    onChangeText={handleChange('grado')}
                    onBlur={handleBlur('grado')}
                    value={values.grado}
                  />
                  {errors.grado && touched.grado && (
                    <Text style={styles.errorText}>{errors.grado}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nombre*</Text>
                  <TextInput
                    style={[styles.input, errors.nombre && touched.nombre && styles.inputError]}
                    onChangeText={handleChange('nombre')}
                    onBlur={handleBlur('nombre')}
                    value={values.nombre}
                  />
                  {errors.nombre && touched.nombre && (
                    <Text style={styles.errorText}>{errors.nombre}</Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Matrícula*</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.matricula && touched.matricula && styles.inputError,
                    ]}
                    onChangeText={handleChange('matricula')}
                    onBlur={handleBlur('matricula')}
                    value={values.matricula}
                  />
                  {errors.matricula && touched.matricula && (
                    <Text style={styles.errorText}>{errors.matricula}</Text>
                  )}
                </View>

                <View style={styles.signatureSection}>
                  <Text style={styles.label}>Firma*</Text>
                  {signatureImage ? (
                    <View style={styles.signaturePreview}>
                      <Image
                        source={{ uri: signatureImage }}
                        style={styles.signatureImage}
                        resizeMode="contain"
                      />
                      <LargeButton
                        title="Cambiar Firma"
                        onPress={() => handleNavigateToSignaturePad(values)}
                      />
                    </View>
                  ) : (
                    <LargeButton
                      title="Capturar Firma"
                      onPress={() => handleNavigateToSignaturePad(values)}
                    />
                  )}
                </View>

                <View style={styles.buttonContainer}>
                  <LargeButton
                    title="Guardar y Continuar"
                    onPress={handleSubmit}
                    disabled={!signatureImage}
                  />
                </View>
              </View>
            )}
          </Formik>
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
  formContainer: {
    width: '100%',
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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  signatureSection: {
    width: '100%',
    marginBottom: 20,
  },
  signaturePreview: {
    alignItems: 'center',
    marginTop: 10,
  },
  signatureImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default SignatureDelivery;
