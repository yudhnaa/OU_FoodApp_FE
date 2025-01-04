import { View, ActivityIndicator } from 'react-native';
import colors from '@/styles/colors';

export default function LoadingComponent() {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" color={colors.Orange_Base} />
        </View>
    );
}