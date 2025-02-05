import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View, Alert, Linking} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {IconButton} from "react-native-paper";
import {router, useFocusEffect, useLocalSearchParams} from "expo-router";
import Button from "@/components/home/button";
import {styles as homeStyles} from "@/components/home/Styles";
import fontStyles from "@/styles/fontStyles";
import colors from "@/styles/colors";
import {authApi, endpoints} from '@/configs/APIs';
import {useAuth} from "@/components/AuthContext";
import {LoadingOverlay} from "@/components/home/LoadingComponents";

const Payment = () => {
    const [parsedOrderInfo, setparsedOrderInfo] = useState(JSON.parse(useLocalSearchParams().orderInfo as string))
    const [loading, setLoading] = useState(false);
    const {access_token} = useAuth();
    const [orderStatus, setOrderStatus] = useState('not paid');

    const [supportedURL, setSupportedURL] = useState('https://google.com');
    const [unsupportedURL, setUnsupportedURL] = useState('https://google.com');

    type OpenURLButtonProps = {
        url: string;
        children: string;
    };

    const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return <Button text={children} onPress={handlePress}/>;
    };

    const getPaymentInfo = async () => {
        setLoading(true);
        const data = {
            order_id: parsedOrderInfo.order_id,
            extra_data: ""
        }
        try {
            const response = await authApi(access_token).post(endpoints.momo_payment, data);
            setSupportedURL(response.data.payUrl);
            setUnsupportedURL(response.data.deeplink);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    // Hàm kiểm tra trạng thái thanh toán
    const checkPaymentStatus = async () => {
        try {
            const res = await authApi(access_token).get(
                `${endpoints.check_order_status}${parsedOrderInfo.order_id}/`
            );
            const currentStatus = res.data.order_status;
            setOrderStatus(currentStatus);
            if (currentStatus !== 'not paid') {
                Alert.alert("Hey Bestie", "Order has been paid");
                router.back();
                return false; // Báo hiệu trạng thái đã thay đổi
            }
            return true; // Trạng thái vẫn là 'not paid'
        } catch (e) {
            console.log(e);
            return true; // Trong trường hợp lỗi, ta vẫn thử tiếp polling
        }
    };

    useEffect(() => {
        getPaymentInfo();
    }, [parsedOrderInfo]);

    useEffect(() => {
        let isMounted = true;

        const pollPaymentStatus = async () => {
            if (!isMounted) return;
            // Gọi API kiểm tra trạng thái
            const shouldContinue = await checkPaymentStatus();
            // Nếu component vẫn còn mounted và trạng thái chưa thay đổi, lên lịch gọi lại sau 5 giây
            if (isMounted && shouldContinue) {
                setTimeout(pollPaymentStatus, 5000);
            }
        };

        // Bắt đầu polling
        pollPaymentStatus();

        // Cleanup: khi component unmount thì đánh dấu isMounted = false để dừng polling
        return () => {
            isMounted = false;
        };
    }, [access_token, parsedOrderInfo.order_id]);

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            {loading && <LoadingOverlay/>}
            <View className={"p-5 flex-col"} style={homeStyles.bodyPage}>
                <View style={styles.container}>
                    <OpenURLButton url={supportedURL}>Open in Browser</OpenURLButton>
                    <OpenURLButton url={unsupportedURL}>Open in MoMo App</OpenURLButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    body: {
        flex: 1,
    },
    section: {
        marginBottom: 15,
    },
    header: {
        marginBottom: 10,
        ...fontStyles.subtitulo,
    },
    dropdownContainer: {
        backgroundColor: colors.Yellow_2,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    dropdown: {
        backgroundColor: colors.Yellow_2,
        borderWidth: 0,
        borderRadius: 8,
    },
    flex1: {
        flex: 1,
    },
    flex4: {
        flex: 4,
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    totalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15
    },
    totalText: {
        fontSize: 20,
    },
    deliveryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Payment;