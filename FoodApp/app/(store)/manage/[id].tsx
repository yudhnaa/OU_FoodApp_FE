import { useLocalSearchParams } from "expo-router";
import {Text,View} from "react-native";



export default function Detail() {
    const {id} = useLocalSearchParams();
    return (
        <View>
            <Text>Manage Store ${id}</Text>
        </View>
    );
}