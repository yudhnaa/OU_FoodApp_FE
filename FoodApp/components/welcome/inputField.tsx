import {Text, TextInput, View} from 'react-native'
import {styles} from './Styles'
import fontStyles from '../../styles/fontStyles'
import colors from "@/styles/colors";


// InputField.tsx
function InputField({label, placeholder, value, onChange, height = 40, multiline = false, paddingTop=0}: {
    label: any,
    placeholder?: string,
    value: any,
    onChange: any,
    height?: number,
    multiline?: boolean,
    paddingTop?: number
}) {
    return (
        <View style={styles.textInputContainer}>
            <Text style={[styles.text, fontStyles.TextInputField]}>{label}</Text>
            <TextInput
                secureTextEntry={label === "Password"}
                style={[styles.textInput, fontStyles.TextInputField, {height: height, paddingTop: paddingTop}]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                multiline={multiline}/>
        </View>
    );
}

// export default InputField;
// const InputField = ( label: any, placeholder = "", value: any, onChange: any) => (
//     <View style={styles.textInputContainer}>
//         <Text style={[styles.text, fontStyles.TextInputField]}>{label}</Text>
//         <TextInput secureTextEntry={label === "Password"} style={[styles.textInput, fontStyles.TextInputField]} placeholder={placeholder} value={value} onChangeText={onChange} />
//     </View>
// );

export default InputField