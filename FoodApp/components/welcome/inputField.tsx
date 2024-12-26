import { Text, TextInput, View } from 'react-native'
import { styles } from './Styles'
import fontStyles from '../../styles/fontStyles'

const InputField = ({ label, placeholder, value, onChange }) => (
    <View style={styles.textInputContainer}>
        <Text style={[styles.text, fontStyles.TextInputField]}>{label}</Text>
        <TextInput secureTextEntry={label === "Password"} style={[styles.textInput, fontStyles.TextInputField]} placeholder={placeholder} value={value} onChangeText={onChange} />
    </View>
);

export default InputField;