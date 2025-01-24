import { Text, View, Pressable, StyleSheet, TextInput, TouchableOpacity,Image,Linking } from "react-native";
import { styles } from "@/components/home/Styles";
import colors from "@/styles/colors";
import fontsStyles from "@/styles/fontStyles";
import { useState } from "react";
import { Icon } from "react-native-paper";

type FAQTypeKeys = 'general' | 'account' | 'service';

const data = {
    "Contact Us": [
        {
            "name" : "Customer Service",
            "link" : "https://github.com/",
            "image" : require('@/assets/images/contact_type/Headphones.png')
        },
        {
            "name" : "Website Support",
            "link" : "https://github.com/",
            "image" : require('@/assets/images/contact_type/Global.png')
        },
        {
            "name" : "WhatsApp",
            "link" : "https://web.whatsapp.com/",
            "image" : require('@/assets/images/contact_type/WhatApp.png')
        },
        {
            "name" : "Facebook",
            "link" : "https://www.facebook.com/",
            "image" : require('@/assets/images/contact_type/Facebook.png')
        },
        {
            "name" : "Instagram",
            "link" : "https://www.instagram.com/",
            "image" : require('@/assets/images/contact_type/Instagram.png')
        },
    ],
}

const FAQ_type_data: Record<FAQTypeKeys, { question: string; answer: string }[]> = {
    general: [
        {
            question: "How to order?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem."
        },
        {
            question: "How to cancel an order?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem."
        },
        {
            question: "How to track my order?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem."
        },
    ],
    account: [
        {
            question: "How to order?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem."
        },
        {
            question: "How to cancel an order?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem."
        },
    ],
    service: [
        {
            question: "How to order?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem."
        }
    ]
};

const FAQ_type = ({ data }: { data: { question: string; answer: string }[] }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <View style={styles1.questionContainer}>
            {data.map((item, index) => (
                <View key={index}>
                    <TouchableOpacity className="flex-row justify-between items-center" onPress={() => toggleAnswer(index)}>
                        <Text style={[styles1.question, expandedIndex === index && styles1.activeQuestion]}>{item.question}</Text>
                        <Icon
                            source={
                                expandedIndex === index
                                    ? "chevron-down"
                                    : "chevron-right"
                            }
                            color={"#E95322"}
                            size={20}
                        />
                    </TouchableOpacity>
                    {expandedIndex === index && (
                        <Text style={styles1.answer}>{item.answer}</Text>
                    )}
                    <View style={styles.seperateLine}></View>
                </View>
            ))}
        </View>
    );
};

const FAQ = ({ data }: { data: Record<FAQTypeKeys, { question: string; answer: string }[]> }) => {
    const [faq_type, setFAQ_type] = useState<FAQTypeKeys>("general");

    return (
        <View>
            <View style={styles1.tabContainer}>
                <Pressable style={[faq_type === 'general' ? styles1.activeTab : styles1.inactiveTab, styles1.tab_2]} onPress={() => setFAQ_type("general")}>
                    <Text style={faq_type === 'general' ? styles1.tabTextActive : styles1.tabTextInactive}>General</Text>
                </Pressable>

                <Pressable style={[faq_type === 'account' ? styles1.activeTab : styles1.inactiveTab, styles1.tab_2]} onPress={() => setFAQ_type("account")}>
                    <Text style={faq_type === 'account' ? styles1.tabTextActive : styles1.tabTextInactive}>Account</Text>
                </Pressable>

                <Pressable style={[faq_type === 'service' ? styles1.activeTab : styles1.inactiveTab, styles1.tab_2]} onPress={() => setFAQ_type("service")}>
                    <Text style={faq_type === 'service' ? styles1.tabTextActive : styles1.tabTextInactive}>Services</Text>
                </Pressable>
            </View>

            <View className="items-center">
                <TextInput
                    className={`bg-white rounded-full h-15 px-3 text-base w-[95%]`}
                    placeholder="Search"
                    style={{ fontSize: 15, fontFamily: 'Spartan_500Medium' }}
                />
            </View>

            <FAQ_type data={FAQ_type_data[faq_type]} />
        </View>
    );
};

const ContactUs = ({ data }: { data: { name: string; link: string,image : string }[] }) => {
    return (
        <View style={styles1.questionContainer}>
            {data.map((item, index) => (
                <View style = {styles1.contactContainer} key={index}>
                    <Pressable style = {styles1.contact} onPress={() => {Linking.openURL(item.link)}}>
                        <View style = {{flexDirection : 'row', alignItems : 'center',justifyContent : 'center'}}>
                            <Image className="mr-2" source={item.image} />
                            <Text className="pt-4" style={[styles1.question]}>{item.name}</Text>
                        </View>
                        <Icon 
                            source="chevron-right"
                            color={"#E95322"}
                            size={20}
                        />
                    </Pressable>
                </View>
            ))}
        </View>
    );
};

export default function HelpCenter() {
    const [isFAQ, setFAQ] = useState<boolean>(true);

    return (
        <View style={styles.backGround}>
            <View style={styles.bodyPage}>
                <View style={styles1.tabContainer}>
                    
                    <Pressable style={[isFAQ === true ? styles1.activeTab : styles1.inactiveTab, styles1.tab]} onPress={() => setFAQ(true)}>
                        <Text style={isFAQ === true ? styles1.tabTextActive : styles1.tabTextInactive}>FAQ</Text>
                    </Pressable>

                    <Pressable style={[isFAQ === false ? styles1.activeTab : styles1.inactiveTab, styles1.tab]} onPress={() => setFAQ(false)}>
                        <Text style={isFAQ === false ? styles1.tabTextActive : styles1.tabTextInactive}>Contact Us</Text>
                    </Pressable>
                </View>

                {isFAQ ? <FAQ data={FAQ_type_data} /> : <ContactUs data={data["Contact Us"]} />}
                
            </View>
        </View>
    );
}

const styles1 = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        padding: 10,
        width: "42%",
        borderRadius: 50,
        alignItems: 'center',
    },
    tab_2: {
        padding: 10,
        width: "30%",
        borderRadius: 50,
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
    questionContainer: {
        padding: 15,
        paddingTop : 25,
        flexDirection: "column",
    },
    question: {
        fontSize: 18,
        fontFamily: "Spartan_700Bold",
        paddingBottom: 10,
    },
    activeQuestion: {
        color: colors.Orange_Base,
    },
    answer: {
        fontSize: 14,
        fontFamily: "Spartan_500Medium",
    },
    contactContainer : {
        width: '100%',
        marginBottom: 25,
    },
    contact : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});