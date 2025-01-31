import {View, Text, Pressable, FlatList} from "react-native";
import {Image} from "expo-image";
import {StyleSheet} from "react-native";
import colors from "@/styles/colors";
import {styles as bgStyles} from "@/components/home/Styles";
import fontsStyles from "@/styles/fontStyles";
import {useEffect, useState} from "react";
import APIs, {endpoints} from "@/configs/APIs";

export default function FaqAndContactUs() {
    type faq = {
        id: number,
        question: string,
        answer: string,
    }

    type contact = {
        id: number,
        name: string,
        data: string,
        icon: any,
    }

    const contactIconMap: { [key: string]: any } = {
        "Phone number": require("@/assets/images/icons/ico_phone.svg"),
        "Email": require("@/assets/images/icons/ico_email.svg"),
        "Address": require("@/assets/images/icons/ico_location.svg"),
        "Hours": require("@/assets/images/icons/ico_clock.svg"),
        "Facebook": require("@/assets/images/icons/ico_facebook.svg"),
        "Instagram": require("@/assets/images/icons/ico_instagram.svg"),
    };


    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState("faq");
    const [faqs, setFaqs] = useState<faq[]>([]);
    const [contacts, setContacts] = useState<contact[]>([]);

    const fetchFAQs = async () => {
        setLoading(true);
        APIs.get(endpoints.questionAnswer).then((res) => {
            setFaqs(res.data)
        }).catch(ex => {
            alert(ex.response.data?.error_description || "Logout failed\nStatus code" + ex.status)
        }).finally(() => {
            setLoading(false)
        })
    }

    const fetchContacts = async () => {
        setLoading(true);
        APIs.get(endpoints.contact).then((res) => {
            let contactsWithIcons = contacts.map((contact) => {
                const iconKey = contact.name; // Use the name as the key
                contact.icon = contactIconMap[iconKey] || null; // Assign icon or null if not found
                return contact;
            });

            setContacts(contactsWithIcons)
        }).catch(ex => {
            alert(ex.response.data?.error_description || "Logout failed\nStatus code" + ex.status)
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchFAQs();
        fetchContacts();
    }, []);

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
                                    <Text style={styles.details}>{item.data}</Text>
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