import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css';

const DatePickerField = ({ value, onChange, error, touched }) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date());

  const handleDateChange = selectedDate => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onChange(formattedDate);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className={styles.webDatePicker}
          wrapperClassName={styles.webDatePickerWrapper}
        />
        {error && touched && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && touched && styles.inputError]}
        value={value}
        placeholder="YYYY-MM-DD"
        editable={false}
      />
      {error && touched && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
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
  webDatePicker: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  webDatePickerWrapper: {
    width: '100%',
  },
});

export default DatePickerField;
