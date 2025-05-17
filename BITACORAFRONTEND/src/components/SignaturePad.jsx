import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity, Text } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import WebSignaturePad from './WebSignaturePad';

const SignaturePad = ({ onSave, onClear }) => {
  const signatureRef = useRef(null);

  const handleSignature = (signature) => {
    onSave(signature);
  };

  const handleClear = () => {
    if (Platform.OS === 'web') {
      onClear();
    } else {
      signatureRef.current?.clearSignature();
      onClear();
    }
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const style = `
    .m-signature-pad--body {
      border: 1px solid #e8e8e8;
      background-color: #fff;
    }
    .m-signature-pad {
      box-shadow: none;
      border: none;
    }
  `;

  // Si estamos en web, usar el componente WebSignaturePad
  if (Platform.OS === 'web') {
    return <WebSignaturePad onSave={handleSignature} onClear={handleClear} />;
  }

  // Para móvil, usar el componente original con botones personalizados
  return (
    <View style={styles.container}>
      <SignatureCanvas
        ref={signatureRef}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        descriptionText="Firma"
        webStyle={style}
        autoClear={true}
        imageType="image/png"
        clearText=""
        confirmText=""
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Limpiar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => signatureRef.current?.readSignature()}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width * 0.9,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  button: {
    padding: 8,
    backgroundColor: '#414BB2',
    borderRadius: 4,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignaturePad; 