import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    isErrorWithCode
} from '@react-native-google-signin/google-signin';
import {getAuth, GoogleAuthProvider, signInWithCredential} from "firebase/auth";
import {app} from "@/firebaseConfig";
import {View} from "react-native";
import {useAuth} from "@/components/AuthContext";
import {router} from "expo-router";
import APIs, {endpoints} from "@/configs/APIs";

//firbase: " “Headful” auth methods such as signInWithPopup(), signInWithRedirect(), linkWithPopup(), and linkWithRedirect()
// do not work in React Native (or Cordova, for that matter). You can still sign in or link with a federated provider
// by using signInWithCredential() with an OAuth token from your provider of choice."


const auth = getAuth(app);

GoogleSignin.configure({
    webClientId: '986206586435-v4vk45m94on0otif6of2r4jqiq25dm1r.apps.googleusercontent.com', // From your plist's CLIENT_ID
    iosClientId: '986206586435-v4vk45m94on0otif6of2r4jqiq25dm1r.apps.googleusercontent.com', // Same as CLIENT_ID for iOS
});


type GoogleSignInAuthProps = {
    setLoading: (loading: boolean) => void;
};

export function GoogleSignInAuth({setLoading}: GoogleSignInAuthProps) {
    const {saveOauth2Token} = useAuth();

    const signIn = async () => {
        setLoading(true)
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn().then((res) => {
            let credential = GoogleAuthProvider.credential(res.data?.idToken);
            // console.log("Credential:", credential)

            signInWithCredential(auth, credential).then(async (userCredential) => {
                // console.log("User:", userCredential)

                await APIs.post(endpoints.google_signin, {
                    idToken: await userCredential.user.getIdToken()
                }).then((res) => {
                    console.log("Sign in successfully")
                    saveOauth2Token(res.data)

                    if (router.canDismiss())
                        router.dismissAll()
                    if (res.status === 201)
                        router.replace("/updateUserInfo")
                    else
                        router.replace("/home")

                }).catch((ex) => {
                    alert(ex.response.data?.error_description || "Login failed\nStatus code" + ex.status)
                }).finally(() => {
                    setLoading(false)
                })
            })
        })
    }

    return (
        <View>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Icon}
                onPress={signIn}
            />
        </View>
    );
}