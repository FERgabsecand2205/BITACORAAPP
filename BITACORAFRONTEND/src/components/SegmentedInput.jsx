import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const SegmentedInput = ({ onChangeText, value = '', label }) => {
    const [segments, setSegments] = useState(['', '', '', '']);
    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    // Actualizar los segmentos cuando el valor cambia externamente
    React.useEffect(() => {
        if (value) {
            const newSegments = value.split('').slice(0, 4);
            while (newSegments.length < 4) newSegments.push('');
            setSegments(newSegments);
        }
    }, [value]);

    const handleSegmentChange = (text, index) => {
        if (text.length > 1) text = text.charAt(0);
        
        const newSegments = [...segments];
        newSegments[index] = text;
        setSegments(newSegments);

        // Combinar todos los segmentos y llamar a onChangeText
        const combinedValue = newSegments.join('');
        onChangeText(combinedValue);

        // Mover al siguiente input si hay texto
        if (text && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !segments[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                {segments.map((segment, index) => (
                    <TextInput
                        key={index}
                        ref={inputRefs[index]}
                        style={styles.input}
                        value={segment}
                        onChangeText={(text) => handleSegmentChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        maxLength={1}
                        autoCapitalize="characters"
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        textAlign: 'left',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    input: {
        width: '23%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: 'center',
        fontSize: 16
    }
});

export default SegmentedInput; 