import { StyleSheet, Text, TextInput, View } from 'react-native'
import { styles } from './Styles'
import fontStyles from '../../styles/fontStyles'

const PhoneNumberInput = ({ value, onChange }: {value: any, onChange: any}) => (
    <View style={styles.textInputContainer}>
        <Text style={styles.text}>Phone Number</Text>
        <View style={[styles.textInput, { flexDirection: "row" }]}>
            <TextInput style={[styles.phonePrefix, fontStyles.TextInputField]} editable={false} value="+84" />
            <TextInput style={[styles.phoneInput, fontStyles.TextInputField]} placeholder="Enter phone number ..." value={value} onChangeText={onChange} />
        </View>
    </View>
);
export default PhoneNumberInput;