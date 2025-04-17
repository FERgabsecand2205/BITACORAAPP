import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';
import { useNavigate } from 'react-router-native';

const Comments = () => {
  const navigate = useNavigate();

  return (
    <LayoutScrollViewPage 
      header={<HeaderTitle titleName="Observaciones y/o comentarios" />}
      body={
        <Formik
          initialValues={{ 
            comments: ''
          }}
          onSubmit={values => {
            console.log(values);
            // Handle form submission
          }}
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
                <LargeButton 
                  title="Imprimir"
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
  }
});

export default Comments; 