import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../themesBitacora';

const LargeButton = ({ title, onPress, type = 'primary' }) => {
    const buttonStyle = type === 'primary' ? styles.button : styles.secondaryButton;
    const textStyle = type === 'primary' ? styles.buttonText : styles.secondaryButtonText;

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

export default LargeButton;
