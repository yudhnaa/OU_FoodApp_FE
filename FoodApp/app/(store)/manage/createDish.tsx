import React,{useState,useEffect} from 'react';
import {Pressable, StyleSheet, Text, View,TextInput} from "react-native";
import {Image} from "expo-image"
import {Button} from "react-native-paper";
import {styles as homeStyles} from "@/components/home/Styles";
import InputField from "@/components/welcome/inputField";
import colors from "@/styles/colors";
import fontStyles from "@/styles/fontStyles";
import DropDownPicker from "react-native-dropdown-picker";
import APIs,{endpoints} from '@/configs/APIs';
import * as ImagePicker from 'expo-image-picker';


export default function CreateDish() {
    const [name,setName] = useState('');
    const [price,setPrice] = useState(0.0);
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState<number | null>(null);
    const [openCategory,setOpenCategory] = useState(false);
    const [image,setImage] = useState<string | null>(null);
    const [dishType, setDishType] = useState([]);


    const loadFoodType = async () => {
        try{
            const response = await APIs.get(endpoints['dish_type']);
            const formattedData = response.data.map((item: any) => ({label : item.name,value : item.id}));
            setDishType(formattedData);
        }
        catch(error){
            console.log(error);
        }
    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access camera roll is required!");
            return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        loadFoodType();
    },[])


    // const createDish = async () => {
    //     try{
    //         const payload = {
    //             "name": name,
    //             "price": price,
    //             "food_type": category,
    //             "description": description,
    //             "image": image
    //         }
    //         console.log(payload);

    //         let res = await APIs.post(endpoints['store_dishes_create'],payload);

    //         if(res.status === 201){
    //             alert('Dish created successfully');
    //         }
    //         else{
    //             alert('Failed to create dish');
    //         }
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // }

    const createDish = async () => {
        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('food_type', category);
            formData.append('description', description);
    
            // Check if image exists and upload it
            if (image) {
                const localUri = image;
                const filename = localUri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
                
                formData.append('image', {
                    uri: localUri,
                    name: filename,
                    type
                });
            }
    
            // Use multipart/form-data for file upload
            const res = await APIs.post(endpoints['store_dishes_create'], formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if(res.status === 201){
                alert('Dish created successfully');
            } else {
                alert('Failed to create dish');
            }
        } catch(error) {
            console.log(error);
            alert('Error creating dish');
        }
    }


    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            <View className={" align-center flex-1 p-5 items-center"} style={homeStyles.bodyPage}>
                <Image
                    source={{uri : image}}
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
                <InputField label={"Name"} value={name} onChange={setName}/>

                <InputField label={"Price"} value={price} onChange={setPrice}/>
                <View style={{marginVertical: 20,width: "80%"}}>
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
                               }}/>
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
                    onPress={createDish}>
                    <Text
                        style={{
                            ...fontStyles.titulo_screen,
                            fontSize: 15,
                            color: colors.Font_2
                        }}>Add dish</Text>
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