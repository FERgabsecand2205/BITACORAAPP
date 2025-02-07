import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    titleLogIn: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black', 
        paddingBlock: 10, 
    },
    titleHeader: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    containerheader: {
        flex: .1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
        width: '100%',
        marginTop: 15,
       },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    recoveryText: {
        color: 'blue',
        textAlign: 'left',
        marginTop: 16,
    },
    privacyText: {
        color: 'blue',
        textAlign: 'left',
        marginTop: 16,
    },
    button: {
        backgroundColor: '#414BB2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderColor: '#414BB2',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
        width: '100%',
    },
    secondaryButtonText: {
        color: '#414BB2',
        fontWeight: 'bold',
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5, // Agregar padding
        backgroundColor: '#414BB2',
        marginTop: 10, // Aumentar el margen superior
    },
    appBarText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
