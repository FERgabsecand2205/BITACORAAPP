import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const DropdownButton = ({ onSelect, title }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['A', 'B', 'C', 'D'];

    const handleSelect = (option) => {
        setSelectedOption(option);
        if (onSelect) {
            onSelect(option);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{title}</Text>
            <View style={styles.buttonGroup}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.button,
                            selectedOption === option && styles.selectedButton
                        ]}
                        onPress={() => handleSelect(option)}
                    >
                        <Text style={[
                            styles.buttonText,
                            selectedOption === option && styles.selectedButtonText
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
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
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        marginHorizontal: 2,
    },
    selectedButton: {
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'black',
    },
    selectedButtonText: {
        color: 'white',
    }
});

export default DropdownButton; 