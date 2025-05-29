import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import { useNavigate, useLocation } from 'react-router-native';

const API_URL = 'https://bitacoraapp.onrender.com/api';

const validationSchema = Yup.object().shape({
  grado: Yup.string()
    .required('El grado es requerido')
    .min(2, 'El grado debe tener al menos 2 caracteres'),
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, 'El nombre solo debe contener letras y espacios'),
  matricula: Yup.string()
    .required('La matrícula es requerida')
    .matches(/^[A-Z0-9-]+$/, 'La matrícula solo debe contener letras mayúsculas, números y guiones'),
});

const SignatureIssuing = () => {
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
  });

  useEffect(() => {
    console.log('=== SignatureIssuing - useEffect ===');
    console.log('Estado de navegación:', location.state);
    console.log('Estado original actual:', originalState);

    if (location.state?.bitacoraId) {
      console.log('BitacoraId recibido:', location.state.bitacoraId);
      setBitacoraId(location.state.bitacoraId);
    }

    if (location.state?.signature) {
      console.log('Firma recuperada del estado');
      setSignatureImage(location.state.signature);
    }

    // Guardar el estado original si no lo tenemos
    if (!originalState && location.state) {
      console.log('Guardando estado original');
      setOriginalState(location.state);
      // Inicializar los valores del formulario desde el estado original
      if (location.state.formData) {
        console.log('Inicializando valores del formulario desde formData');
        setInitialFormValues(location.state.formData);
      } else if (location.state.grado || location.state.nombre || location.state.matricula) {
        console.log('Inicializando valores del formulario desde el estado original');
        setInitialFormValues({
          grado: location.state.grado || '',
          nombre: location.state.nombre || '',
          matricula: location.state.matricula || '',
        });
      }
    }
  }, [location.state, originalState]);

  const handleSignatureComplete = signature => {
    console.log('=== SignatureIssuing - handleSignatureComplete ===');
    console.log('Firma recibida:', signature ? 'Presente' : 'No presente');

    if (signature) {
      console.log('Firma capturada:', signature.substring(0, 50) + '...');
      setSignatureImage(signature);
    }
  };

  const handleNavigateToSignaturePad = formValues => {
    console.log('=== SignatureIssuing - Navegando a SignaturePad ===');
    console.log('Callback disponible:', location.state?.onSignatureComplete ? 'Sí' : 'No');
    console.log('Estado original a mantener:', originalState);
    console.log('Valores del formulario a mantener:', formValues);

    navigate('/signature-pad', {
      state: {
        returnTo: '/signatureIssuing',
        bitacoraId: bitacoraId,
        formData: formValues,
        onSignatureComplete: handleSignatureComplete,
      },
    });
  };

  const handleSubmit = async values => {
    console.log('=== SignatureIssuing - handleSubmit ===');
    console.log('Valores del formulario:', values);
    console.log('Imagen de firma:', signatureImage ? 'Presente' : 'No presente');
    console.log('BitacoraId a enviar:', bitacoraId);
    console.log('Estado original a mantener:', originalState);

    if (!bitacoraId) {
      setError('No se encontró el ID de la bitácora');
      return;
    }

    if (!signatureImage) {
      Alert.alert('Error', 'Por favor, capture su firma antes de continuar.');
      return;
    }

    try {
      // Asegurarse de que la imagen de la firma esté en el formato correcto
      let base64Image = signatureImage;
      if (signatureImage.startsWith('data:image')) {
        base64Image = signatureImage.split(',')[1];
      }

      const response = await fetch(`${API_URL}/bitacora/signature-issuing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grado: values.grado,
          nombre: values.nombre,
          matricula: values.matricula,
          firma: {
            data: base64Image,
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

      // Navegar a SignatureDoer con los datos necesarios
      navigate('/signatureDoer', {
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
      header={<HeaderTitle titleName="Datos de quien emite la bitácora" />}
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

export default SignatureIssuing;
