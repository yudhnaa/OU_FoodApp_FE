import {Text, TextInput, View} from 'react-native'
import {styles} from './Styles'
import fontStyles from '../../styles/fontStyles'
import colors from "@/styles/colors";


// InputField.tsx
function InputField({label, placeholder, value, onChange, height = 40, multiline = false, paddingTop=0, textClassName="", textBoxClassName="", containerClassName="", isSecure=false, autoCapitalize='sentences', inputDisabled = false}: {
    label: any,
    placeholder?: string,
    value: any,
    onChange: any,
    height?: number,
    multiline?: boolean,
    paddingTop?: number,
    textClassName?: string,
    textBoxClassName?: string,
    containerClassName?: string,
    isSecure?: boolean,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
    inputDisabled?: boolean
}) {
    return (
        <View style={styles.textInputContainer} className={containerClassName}>
            <Text style={[styles.text, fontStyles.TextInputField]} className={textClassName}>{label}</Text>
            <TextInput
                secureTextEntry={isSecure}
                style={[styles.textInput, fontStyles.TextInputField, {height: height, paddingTop: paddingTop}]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                multiline={multiline}
                autoCapitalize={autoCapitalize}
                className={textBoxClassName}
                aria-disabled={inputDisabled}/>
        </View>
    );
}

export default InputField