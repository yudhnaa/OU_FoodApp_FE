import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { Image } from "expo-image"
import { Button } from "react-native-paper";
import { styles as homeStyles } from "@/components/home/Styles";
import InputField from "@/components/welcome/inputField";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import DropDownPicker from "react-native-dropdown-picker";
import APIs, { authApi, endpoints } from '@/configs/APIs';
import { useFoodContext } from "@/app/(store)/manage/FoodDetailsContext";
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/components/AuthContext';


export default function Detail() {
    const { selectedFood } = useFoodContext();
    const [name, setName] = useState(selectedFood.name);
    const [price, setPrice] = useState(selectedFood.price);
    const [description, setDescription] = useState(selectedFood.description);
    const [category, setCategory] = useState<number | null>(selectedFood.food_type);
    const [openCategory, setOpenCategory] = useState(false);
    const [image, setImage] = useState<string | null>(selectedFood.image);
    const [dishType, setDishType] = useState([]);
    const { access_token } = useAuth();

    const loadFoodType = async () => {
        try {
            const response = await APIs.get(endpoints['dish_type']);
            const formattedData = response.data.map((item: any) => ({ label: item.name, value: item.id }));
            setDishType(formattedData);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadFoodType();
    }, [selectedFood.id])


    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission Denied");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    const updateDish = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price.toString());
            formData.append('food_type', category ? category.toString() : '');
            formData.append('description', description);

            // Check if image exists and upload it
            // if (image) {
            //     const localUri = image;
            //     const filename = localUri.split('/').pop() || 'image.jpg';
            //     const match = /\.(\w+)$/.exec(filename);
            //     const type = match ? `image/${match[1]}` : `image/jpeg`;

            //     // Create a Blob from the image URI
            //     const response = await fetch(localUri);
            //     const blob = await response.blob();
            //     formData.append('image', blob, filename);
            // }
            if (image) {
                formData.append("image", {
                    uri: image,
                    name: 'image.jpg',
                    type: "image/jpeg",
                } as any);
            }

            console.log(formData);


            let res = await authApi(access_token).put(`/stores/dishes/${selectedFood.id}/update/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200) {
                alert('Dish updated successfully');
            }
            else {
                alert('Failed to updated dish');
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={" align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 30,
                    }}></Image>
                <Button
                    icon={"camera"}
                    textColor={"black"}
                    mode={"text"}
                    onPress={pickImage}>Change Image</Button>
                <InputField label={"Name"} value={name} onChange={setName} />

                <InputField
                    label={"Price"}
                    value={price.toString()} // Chuyển đổi price sang string
                    onChange={(value: any) => setPrice(parseFloat(value))}
                />

                <View style={{ marginVertical: 20, width: "80%" }}>
                    {/*<TextInputUser placeholder={"Description..."} value={description} onChangeText={setDescription}></TextInputUser>*/}
                    <TextInput placeholder={"Description"} value={description} onChangeText={setDescription}
                        style={{
                            ...fontStyles.Paragraph,
                            lineHeight: 25,
                            fontSize: 15,
                            height: 100,
                            color: "black",
                            backgroundColor: colors.Yellow_2,
                            borderRadius: 20,
                            padding: 15,
                        }} />
                </View>

                <View style={styles.dropdownContainer}>
                    <View style={styles.flex1}>
                        <DropDownPicker
                            style={styles.dropdown}
                            open={openCategory}
                            value={category}
                            items={dishType}
                            setOpen={setOpenCategory}
                            setValue={setCategory}
                            placeholder="Select Category..."
                        />
                    </View>
                </View>

                <Pressable
                    style={{
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.Orange_Base,
                        padding: 10,
                        margin: 20
                    }}
                    onPress={updateDish}>
                    <Text
                        style={{
                            ...fontStyles.titulo_screen,
                            fontSize: 15,
                            color: colors.Font_2
                        }}>Update dish</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    dropdownContainer: {
        backgroundColor: colors.Yellow_2,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: '80%',
    },
    dropdown: {
        backgroundColor: colors.Yellow_2,
        borderWidth: 0,
        borderRadius: 8,
    },
})