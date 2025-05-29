import React from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import { useNavigate, useLocation } from 'react-router-native';

const Comments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bitacoraId } = location.state || {};

  const handleSubmit = async values => {
    try {
      if (!bitacoraId) {
        Alert.alert('Error', 'No se encontró el ID de la bitácora');
        return;
      }

      // 1. Actualizar la bitácora con los comentarios
      const updateResponse = await fetch(
        `https://bitacoraapp.onrender.com/api/bitacora/id/${bitacoraId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            observacionesComments: values.comments,
          }),
        },
      );

      if (!updateResponse.ok) {
        throw new Error('Error al actualizar los comentarios');
      }

      // 2. Exportar a Excel
      const excelResponse = await fetch(
        `http://localhost:3001/api/bitacora/${bitacoraId}/export-excel`,
        {
          method: 'POST',
        },
      );

      if (!excelResponse.ok) {
        throw new Error('Error al exportar a Excel');
      }

      // 3. Descargar el archivo
      const blob = await excelResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BITACORA-${bitacoraId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      Alert.alert('Éxito', 'Bitácora exportada exitosamente');
      navigate('/'); // Volver a la página principal
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message || 'Hubo un problema al procesar la solicitud');
    }
  };

  return (
    <LayoutScrollViewPage
      header={<HeaderTitle titleName="Observaciones y/o comentarios" />}
      body={
        <Formik
          initialValues={{
            comments: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.body}>
              <View style={styles.textareaContainer}>
                <TextInput
                  style={styles.textarea}
                  onChangeText={handleChange('comments')}
                  onBlur={handleBlur('comments')}
                  value={values.comments}
                  multiline={true}
                  numberOfLines={20}
                  placeholder="Ingrese sus observaciones o comentarios aquí..."
                  textAlignVertical="top"
                />
              </View>
              <View style={styles.buttonContainer}>
                <LargeButton title="Imprimir" onPress={handleSubmit} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textareaContainer: {
    width: '80%',
    height: '70%',
    marginVertical: 20,
  },
  textarea: {
    width: '100%',
    height: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Comments;
