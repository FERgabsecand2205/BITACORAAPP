import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importar DateTimePicker
import LayoutScrollViewPage from '../components/LayoutScrollViewPage'; // Cambiar importación
import HeaderTitle from '../components/HeaderTitle';
import LargeButton from '../components/LargeButton';

const InfoFlight = () => {
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <LayoutScrollViewPage 
      header={<HeaderTitle titleName="Información de Vuelo" />}
      body={
        <Formik
          initialValues={{ lugarSalida: '', lugarLlegada: '', tipoVuelo: '', eventosTorque: '', cargaAceiteMotores: '', cargaAceiteAPU: '', fecha: date.toISOString().split('T')[0] }} // Agregar fecha
          onSubmit={values => {
            console.log(values);
            // Aquí puedes manejar el envío del formulario
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <View style={styles.body}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Lugar de Salida</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('lugarSalida')}
                  onBlur={handleBlur('lugarSalida')}
                  value={values.lugarSalida}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Lugar de Llegada</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('lugarLlegada')}
                  onBlur={handleBlur('lugarLlegada')}
                  value={values.lugarLlegada}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Vuelo</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('tipoVuelo')}
                  onBlur={handleBlur('tipoVuelo')}
                  value={values.tipoVuelo}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Eventos de Torque</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('eventosTorque')}
                  onBlur={handleBlur('eventosTorque')}
                  value={values.eventosTorque}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Carga Aceite Motores</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('cargaAceiteMotores')}
                  onBlur={handleBlur('cargaAceiteMotores')}
                  value={values.cargaAceiteMotores}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Carga Aceite A.P.U.</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('cargaAceiteAPU')}
                  onBlur={handleBlur('cargaAceiteAPU')}
                  value={values.cargaAceiteAPU}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fecha</Text>
                <TextInput
                  style={styles.input}
                  value={values.fecha}
                  onFocus={() => setShow(true)}
                />
                {show && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      onChange(event, selectedDate);
                      setFieldValue('fecha', selectedDate.toISOString().split('T')[0]);
                    }}
                  />
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
  buttonText: {
    color: 'white',
  },
});

export default InfoFlight;
