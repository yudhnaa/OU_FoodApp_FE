import {View, Pressable} from 'react-native'
import {Icon} from 'react-native-paper';
import {router, Stack} from 'expo-router'
import {StyleSheet} from 'react-native'

export default function WelcomeLayout() {
    // route = useRouter()
    return (
        <Stack screenOptions={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTitleStyle: styles.title,
            headerStyle: {backgroundColor: '#F5CB58'},
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="welcome" options={{
                headerShown: false,
                headerLeft: () =>
                    (<View>
                        <Pressable onPressIn={() => {
                            router.back()
                        }}>
                            <Icon
                                source="chevron-left"
                                color={"#E95322"}
                                size={35}
                            />
                        </Pressable>
                    </View>),
            }}/>
            <Stack.Screen name="loading" options={{
                headerShown: false,
                headerLeft: () =>
                    (<View>
                        <Pressable onPressIn={() => {
                            router.back()
                        }}>
                            <Icon
                                source="chevron-left"
                                color={"#E95322"}
                                size={35}
                            />
                        </Pressable>
                    </View>),
            }}/>
            <Stack.Screen name="registration" options={{
                headerShown: true, title: "New Account",
                headerLeft: () =>
                    (<View>
                        <Pressable onPressIn={() => {
                            router.back()
                        }}>
                            <Icon
                                source="chevron-left"
                                color={"#E95322"}
                                size={35}
                            />
                        </Pressable>
                    </View>),
            }}/>
            <Stack.Screen name="login" options={{
                headerShown: true, title: "Login",
                headerLeft: () =>
                    (<View>
                        <Pressable onPressIn={() => {
                            router.back()
                        }}>
                            <Icon
                                source="chevron-left"
                                color={"#E95322"}
                                size={35}
                            />
                        </Pressable>
                    </View>),
            }}/>
            <Stack.Screen name="updateUserInfo" options={{headerShown: true, title: "Update User Info"}}/>
            <Stack.Screen name={"forgotPassword"} options={{
                headerShown: true,
                title: "Forgot Password",
                headerLeft: () =>
                    (<View>
                        <Pressable onPressIn={() => {
                            router.back()
                        }}>
                            <Icon
                                source="chevron-left"
                                color={"#E95322"}
                                size={35}
                            />
                        </Pressable>
                    </View>),
            }}/>
        </Stack>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "#F8F8F8",
        fontSize: 25,
        fontWeight: "700",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 20
    },
})