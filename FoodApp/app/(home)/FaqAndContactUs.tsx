import {View, Text, Pressable, FlatList} from "react-native";
import {Image} from "expo-image";
import {StyleSheet} from "react-native";
import colors from "@/styles/colors";
import {styles as bgStyles} from "@/components/home/Styles";
import fontsStyles from "@/styles/fontStyles";
import {useState} from "react";

const contacts = [
    {
        id: 1,
        name: "Phone number",
        value: "123-456-7890",
        icon: require("../../assets/images/icons/ico_phone.svg"),
    },
    {
        id: 2,
        name: "Email",
        value: "example.com",
        icon: require("../../assets/images/icons/ico_email.svg"),
    },
    {
        id: 3,
        name: "Address",
        value: "1234 Example St, City, State, 12345",
        icon: require("../../assets/images/icons/ico_location.svg")
    },
    {
        id: 4,
        name: "Hours",
        value: "Monday - Friday: 9am - 5pm",
        icon: require("../../assets/images/icons/ico_clock.svg")
    },
    {
        id: 5,
        name: "Facebook",
        value: "facebook.com",
        icon: require("../../assets/images/icons/ico_facebook.svg")
    },
    {
        id: 6,
        name: "Instagram",
        value: "instagram.com",
        icon: require("../../assets/images/icons/ico_instagram.svg")
    }
]

const faqs = [
    {
        id: 1,
        question: "How to cancel an order?",
        answer: "You can cancel an order by going to the order details page and clicking on the cancel order button."
    },
    {
        id: 2,
        question: "How to track an order?",
        answer: "You can track an order by going to the order details page and clicking on the track order button."
    },
    {
        id: 3,
        question: "How to leave a review?",
        answer: "You can leave a review by going to the order details page and clicking on the leave a review button."
    },
    {
        id: 4,
        question: "How to order again?",
        answer: "You can order again by going to the order details page and clicking on the order again button."
    },
    {
        id: 5,
        question: "How to contact us?",
        answer: "You can contact us by going to the contact us page and filling out the contact form."
    }

]

export default function FaqAndContactUs() {

    const [tab, setTab] = useState("faq");

    return (
        <View style={bgStyles.backGround}>
            <View style={bgStyles.bodyPage}>
                <View style={styles.tabContainer}>
                    <Pressable
                        style={[tab === "faq" ? styles.activeTab : styles.inactiveTab, styles.tab]}
                        onPress={() => {
                            setTab("faq")
                        }}>
                        <Text
                            style={tab === "faq" ? styles.tabTextActive : styles.tabTextInactive}>FAQ</Text>
                    </Pressable>
                    <Pressable
                        style={[tab === "contactus" ? styles.activeTab : styles.inactiveTab, styles.tab]}
                        onPress={() => {
                            setTab("contactus")
                        }}>
                        <Text
                            style={tab === "contactus" ? styles.tabTextActive : styles.tabTextInactive}>Contact
                            Us</Text>
                    </Pressable>
                </View>
                {tab === "faq" &&
                    <FlatList
                        data={faqs}
                        renderItem={({item}) => (
                            <View className="m-5" style={styles.container}>
                                <View className="ml-5 flex-1">
                                    <Text style={styles.title}>{item.question}</Text>
                                    <Text style={styles.details}>{item.answer}</Text>
                                </View>
                            </View>
                        )}
                    />}
                {tab === "contactus" &&
                    <FlatList
                        data={contacts}
                        renderItem={({item}) => (
                            <View className="m-5" style={styles.container}>
                                <Image source={item.icon} style={styles.image} contentFit={"contain"}></Image>
                                <View className="ml-5 flex-1">
                                    <Text style={styles.title}>{item.name}</Text>
                                    <Text style={styles.details}>{item.value}</Text>
                                </View>
                            </View>
                        )}
                    />}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        padding: 10,
        width: "30%",
        borderRadius: 10,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: colors.Orange_Base,
    },
    inactiveTab: {
        backgroundColor: colors.Orange_2,
    },
    tabTextActive: {
        ...fontsStyles.TextInputField,
        color: colors.Font_2,
    },
    tabTextInactive: {
        ...fontsStyles.TextInputField,
        color: colors.Orange_Base,
    },
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
});