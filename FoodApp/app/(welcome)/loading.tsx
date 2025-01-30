import {View, StyleSheet, Alert, Linking} from "react-native";
import * as Location from "expo-location";
import {useState, useEffect} from "react";
import Constrains from "expo-constants";
import {Image} from "expo-image";
import {router} from "expo-router";
import colors from "../../styles/colors";
// import {getObjectValue} from "@/components/asyncStorage";
// import { canGoBack } from "expo-router/build/global-state/routing";
import {useAuth} from "@/components/AuthContext";


export default function Loading() {
    // Trang thai cua location service cua thiet bi
    const [locationServicesEnabled, setLocationServices] = useState<boolean>(false);

    // Trang thai cua quyen truy cap vi tri
    const [locationPermission, setLocationPermission] = useState<string>("denied");

    // // Dia chi hien tai
    // const [currentAddress, setCurrentAddress] = useState<Location.LocationGeocodedAddress | null>(null);

    const {oauth2Token, loading, setLocation} = useAuth();

    useEffect(() => {
        const checkAndGetLocation = async () => {
            await checkLocationServicesEnabled();
            await checkLocationPermission();
            await getCurrentLocation();
        };

        checkAndGetLocation();
    }, []);

    const checkLocationServicesEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();

        if (!enabled) {
            Alert.alert(
                "Location Services Not Enabled",
                `Please enable location services on your device`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            Linking.openSettings();
                        },
                    },
                ],
                {cancelable: false}
            );
        } else {
            setLocationServices(true);
        }
    };

    const checkLocationPermission = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Allow Location Permisson",
                `Please allow location services for ${Constrains.expoConfig?.name} in Settings`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            Linking.openSettings();
                        },
                    },
                ]
            );
        } else {
            setLocationPermission(status);
        }
    };

    const getCurrentLocation = async () => {
        let {latitude, longitude} = (await Location.getCurrentPositionAsync())
            .coords;

        let address = await Location.reverseGeocodeAsync({
            latitude: latitude,
            longitude: longitude,
        });
        // setCurrentAddress(address[0]);
        setLocation({latitude, longitude});
        // console.info("V tri hien tai:", latitude, longitude);
        // console.info("Dia chi hien tai:", address[0]);
    };

    useEffect(() => {
            const checkAndNavigate = async () => {
                // if (locationServicesEnabled && locationPermission === "granted" && currentAddress && !loading) {
                if (locationServicesEnabled && locationPermission === "granted" && !loading) {
                    try{
                        // console.info("Token:", oauth2Token)
                        let getTokenDate = new Date(oauth2Token.date)
                        let expireDate = new Date(getTokenDate.getTime() + 3600 * 1000)

                        if (oauth2Token !== null && expireDate > new Date()) {
                            router.replace("/home");
                        } else
                            throw new Error("Token is expired");
                    } catch(error) {
                        router.replace("/welcome");
                    }
                }
            }

            checkAndNavigate()
        }
        ,
        [locationServicesEnabled, locationPermission]
    )
    ;

    return (
        <View style={styles.firstScreen}>
            <Image
                style={styles.image}
                source={require("../../assets/images/logo/logo-first.svg")}
                contentFit="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    firstScreen: {
        flex: 1,
        backgroundColor: colors.Yellow_Base,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 1,
        width: "50%",
        alignSelf: "center"
    },
});
