import React, {useState} from 'react';
import {Alert, Text, View} from "react-native";
import {styles as homeStyles, styles as bgStyle} from "@/components/home/Styles";
import InputField from "../../../components/welcome/inputField";
import Button from "../../../components/home/button";
import APIs, {endpoints} from "@/configs/APIs";
import {useAuth} from "@/components/AuthContext";
import LoadingOverlay from "@/components/home/LoadingComponents";

function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const {userInfo} = useAuth();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const changPassword = async () => {
        if (currentPassword === "") {
            alert("Current password is required");
            return;
        }
        if (newPassword === "") {
            alert("New password is required");
            return;
        }
        if (confirmNewPassword === "") {
            alert("Confirm new password is required");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            alert("New password and confirm new password must be the same");
            return;
        }
        try {
            setLoading(true);
            await APIs.post(endpoints.change_password, {
                "user_id": userInfo.id,
                old_password: currentPassword,
                new_password: newPassword
            })
            Alert.alert("Hey Bestie", "Change password successfully");
        }
        catch (e: any) {
            setLoading(false);
            Alert.alert("Hey Bestie", e.response.data.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200)
        }

    }

    return (
        <View className={"flex-1"} style={homeStyles.backGround}>
            {loading && <LoadingOverlay></LoadingOverlay>}
            <View className={"p-5 flex-col"} style={homeStyles.bodyPage}>
                <View className={"flex-1"}>
                    <InputField label={"Current password"} value={currentPassword} onChange={setCurrentPassword}
                                isSecure={true}/>
                    <InputField label={"New password"} value={newPassword} onChange={setNewPassword} isSecure={true}/>
                    <InputField label={"Confirm new password"} value={confirmNewPassword}
                                onChange={setConfirmNewPassword} isSecure={true}/>

                    <Button text={"Change Password"} onPress={() => {
                        changPassword()
                    }}></Button>
                </View>
            </View>
        </View>
    );
}

export default ChangePassword;