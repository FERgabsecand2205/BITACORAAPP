import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { styles as themeStyles } from '../themesBitacora';

const SmallButton = ({ title, onPress, type = 'primary', style }) => {
    const baseButtonStyle = type === 'primary' ? themeStyles.button : themeStyles.secondaryButton;
    const textStyle = type === 'primary' ? themeStyles.buttonText : themeStyles.secondaryButtonText;

    return (
        <TouchableOpacity 
            style={[baseButtonStyle, styles.smallButton, style]} 
            onPress={onPress}
        >
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    smallButton: {
        width: '48%',
    }
});

export default SmallButton; 