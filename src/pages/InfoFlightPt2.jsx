import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import LayoutScrollViewPage from '../components/LayoutScrollViewPage';
import HeaderTitle from '../components/HeaderTitle';
import SmallButton from '../components/SmallButton';
import SegmentedInput from '../components/SegmentedInput';
import { useNavigate } from 'react-router-native';

const InfoFlightPt2 = () => {
  const navigate = useNavigate();
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <LayoutScrollViewPage 
      header={<HeaderTitle titleName="Correcciones/Servicios" />}
      body={
        <Formik
          initialValues={{ fecha: date.toISOString().split('T')[0], codigoATA: '', mmReferencia: '', observaciones: '' }}
          onSubmit={values => {
            console.log(values);
            navigate('/InfoFlightComponents', { state: { maintenanceData: values } });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
            <View style={styles.body}>
              <Text style={styles.subtitle}>
                Correcciones o Servicios de Mantenimiento
              </Text>
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
                      if (selectedDate) {
                        setFieldValue('fecha', selectedDate.toISOString().split('T')[0]);
                      }
                    }}
                  />
                )}
              </View>
              <SegmentedInput
                label="Código A.T.A. (Air Transport Association)"
                value={values.codigoATA}
                onChangeText={(text) => setFieldValue('codigoATA', text)}
              />
              <View style={styles.inputGroup}>
                <Text style={styles.label}>MM (Referencia Manual de Mantenimiento)</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('mmReferencia')}
                  onBlur={handleBlur('mmReferencia')}
                  value={values.mmReferencia}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Observaciones</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('observaciones')}
                  onBlur={handleBlur('observaciones')}
                  value={values.observaciones}
                />
              </View>
              <View style={styles.buttonContainer}>
                <SmallButton 
                  title="Previo"
                  onPress={() => navigate('/InfoFlight')}
                  style={{ backgroundColor: '#3f51b5' }}
                />
                <SmallButton 
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
  subtitle: {
    fontSize: 16, // 2px larger than label text
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
  },
  inputGroup: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  }
});

export default InfoFlightPt2;
