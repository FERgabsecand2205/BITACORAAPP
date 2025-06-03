import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import { useNavigate, useLocation } from 'react-router-native';
import '../styles/SignatureDoer.css';
import { API_URL } from '../utils/api';

const validationSchema = Yup.object().shape({
  grado: Yup.string().required('El grado es requerido'),
  nombre: Yup.string().required('El nombre es requerido'),
  matricula: Yup.string().required('La matrícula es requerida'),
  mel: Yup.string().required('El MEL es requerido'),
});

const SignatureDoer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [signatureImage, setSignatureImage] = useState(null);
  const [bitacoraId, setBitacoraId] = useState(null);
  const [error, setError] = useState(null);
  const [originalState, setOriginalState] = useState(null);
  const [initialFormValues, setInitialFormValues] = useState({
    grado: '',
    nombre: '',
    matricula: '',
    mel: '',
  });

  useEffect(() => {
    console.log('=== SignatureDoer - useEffect ===');
    console.log('Estado de navegación:', location.state);
    console.log('Estado original actual:', originalState);
    console.log('=== SignatureDoer - Debug Info ===');
    console.log('URL actual:', window.location.pathname);
    console.log('Estado del componente:', {
      bitacoraId,
      signatureImage: signatureImage ? 'Presente' : 'No presente',
      error,
      initialFormValues,
    });
    // Manejar el estado de navegación
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

      // Guardar el estado original solo si no lo tenemos
      if (!originalState) {
        console.log('Guardando estado original');
        setOriginalState(location.state);
      }
    }
  }, [location.state, originalState, bitacoraId, error, initialFormValues, signatureImage]);

  const handleSignatureComplete = signature => {
    console.log('=== SignatureDoer - handleSignatureComplete ===');
    console.log('Firma recibida:', signature ? 'Presente' : 'No presente');
    if (signature) {
      console.log('Firma capturada:', signature.substring(0, 50) + '...');
      setSignatureImage(signature);
    }
  };

  const handleNavigateToSignaturePad = formValues => {
    console.log('=== SignatureDoer - Navegando a SignaturePad ===');
    console.log('Callback disponible:', location.state?.onSignatureComplete ? 'Sí' : 'No');
    console.log('Estado original a mantener:', originalState);
    console.log('Valores del formulario a mantener:', formValues);
    navigate('/signature-pad', {
      state: {
        returnTo: '/signatureDoer',
        bitacoraId: bitacoraId,
        formData: formValues,
        onSignatureComplete: handleSignatureComplete,
      },
    });
  };

  const handleSubmit = async values => {
    console.log('=== SignatureDoer - handleSubmit ===');
    console.log('User Agent:', navigator.userAgent);
    console.log('Valores del formulario:', values);
    console.log('Imagen de firma:', signatureImage ? 'Presente' : 'No presente');
    if (signatureImage) {
      console.log('Longitud de la firma:', signatureImage.length);
      console.log('Primeros 100 caracteres de la firma:', signatureImage.substring(0, 100));
      console.log('¿Base64?', signatureImage.startsWith('data:image'));
    }
    console.log('BitacoraId a enviar:', bitacoraId);
    console.log('Estado original a mantener:', originalState);

    if (!bitacoraId) {
      setError('No se encontró el ID de la bitácora');
      return;
    }

    if (!signatureImage) {
      setError('La firma es requerida');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/bitacora/signature-doer`, {
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

      console.log('=== SignatureDoer - Navegando a SignatureDelivery ===');
      console.log('Estado a enviar:', {
        ...originalState,
        bitacoraId: bitacoraId,
        formData: values,
        signature: signatureImage,
      });

      // Navegar a SignatureDelivery con los datos necesarios
      navigate('/signatureDelivery', {
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
      header={<HeaderTitle titleName="Datos de quien realizó las acciones" />}
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

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>MEL (Lista de Equipo mínimo)*</Text>
                  <TextInput
                    style={[styles.input, errors.mel && touched.mel && styles.inputError]}
                    onChangeText={handleChange('mel')}
                    onBlur={handleBlur('mel')}
                    value={values.mel}
                  />
                  {errors.mel && touched.mel && <Text style={styles.errorText}>{errors.mel}</Text>}
                </View>

                <View style={styles.signatureSection}>
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

export default SignatureDoer;
