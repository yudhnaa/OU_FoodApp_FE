import { Text, TextInput, View } from 'react-native'
import { styles } from './Styles'

const InputField = ({ label, placeholder }) => (
    <View style={styles.textInputContainer}>
        <Text style={styles.text}>{label}</Text>
        <TextInput style={styles.textInput} placeholder={placeholder} />
    </View>
);

export default InputField;