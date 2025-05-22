import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import WebSignaturePad from './WebSignaturePad';
import LargeButton from './LargeButton';

const SignaturePad = ({ onSave, isWeb }) => {
  const signatureRef = useRef(null);

  const handleSave = (signature) => {
    console.log('=== SignaturePad - handleSave ===');
    console.log('Firma guardada:', signature ? 'Presente' : 'No presente');
    onSave(signature);
  };

  const handleClear = () => {
    console.log('=== SignaturePad - handleClear ===');
    if (signatureRef.current) {
      signatureRef.current.clearSignature();
    }
  };

  if (isWeb) {
    return <WebSignaturePad onSave={handleSave} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.signatureContainer}>
        <SignatureCanvas
          ref={signatureRef}
          onOK={handleSave}
          onEmpty={() => handleSave(null)}
          descriptionText="Firma"
          clearText="Limpiar"
          confirmText="Guardar"
          webStyle={`
            .m-signature-pad--body {
              border: 1px solid #e8e8e8;
              border-radius: 4px;
            }
            .m-signature-pad--footer {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding: 10px;
            }
            .button {
              padding: 10px 20px;
              border-radius: 4px;
              background-color: #007AFF;
              color: white;
              border: none;
              cursor: pointer;
            }
            .button.clear {
              background-color: #FF3B30;
            }
          `}
          androidStyle={`
            .m-signature-pad--body {
              border: 1px solid #e8e8e8;
              border-radius: 4px;
            }
            .m-signature-pad--footer {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding: 10px;
            }
            .button {
              padding: 10px 20px;
              border-radius: 4px;
              background-color: #007AFF;
              color: white;
              border: none;
            }
            .button.clear {
              background-color: #FF3B30;
            }
          `}
          iosStyle={`
            .m-signature-pad--body {
              border: 1px solid #e8e8e8;
              border-radius: 4px;
            }
            .m-signature-pad--footer {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              padding: 10px;
            }
            .button {
              padding: 10px 20px;
              border-radius: 4px;
              background-color: #007AFF;
              color: white;
              border: none;
            }
            .button.clear {
              background-color: #FF3B30;
            }
          `}
        />
      </View>
      {Platform.OS === 'ios' && (
        <View style={styles.buttonContainer}>
          <LargeButton
            title="Limpiar"
            onPress={handleClear}
            style={styles.clearButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  signatureContainer: {
    flex: 1,
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
});

export default SignaturePad; 