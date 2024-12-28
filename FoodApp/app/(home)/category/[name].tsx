import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function CategoryPage() {
    const { name } = useLocalSearchParams();
    return (
        <View>
            <Text>This is the {name} page</Text>
        </View>
    );
}