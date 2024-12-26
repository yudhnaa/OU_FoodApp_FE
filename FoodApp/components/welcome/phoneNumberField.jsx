import { StyleSheet, Text, TextInput, View } from 'react-native'
import { styles } from './Styles'

const PhoneNumberInput = () => (
    <View style={styles.textInputContainer}>
        <Text style={styles.text}>Phone Number</Text>
        <View style={[styles.textInput, { flexDirection: "row" }]}>
            <TextInput style={styles.phonePrefix} editable={false} value="+84" />
            <TextInput style={styles.phoneInput} placeholder="Enter phone number ..." />
        </View>
    </View>
);

export default PhoneNumberInput;