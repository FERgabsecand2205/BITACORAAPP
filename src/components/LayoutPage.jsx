import React from 'react';
import { View, StyleSheet } from 'react-native';

const LayoutPage = ({ header, body, buttons, footer }) => {
  return (
    <View style={styles.containerPage}>
        <View style={styles.headerContainer}>
          {header}
        </View>
        <View style={styles.contentBody}>
              <View style={styles.body}>
                  {body}
              </View>
        </View>
        <View style={styles.buttonContainer}>
              {buttons}
        </View>
        <View style={styles.footer}>
              {footer}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  headerContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentBody: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    padding: 20,
    width: '100%',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: 20,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});

export default LayoutPage;
