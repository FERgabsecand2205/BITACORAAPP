import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../themesBitacora';

const HeaderTitle = ({ titleName }) => (
    <View style={styles.containerheader}>
        <Text style={styles.titleHeader}>{titleName}</Text>
        <View style={styles.separator} />
    </View>
);

export default HeaderTitle;