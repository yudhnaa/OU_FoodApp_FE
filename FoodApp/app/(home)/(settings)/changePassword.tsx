import React, {useState} from 'react';
import {Text, View} from "react-native";
import {styles as bgStyle} from "@/components/home/Styles";
import InputField from "../../../components/welcome/inputField";
import Button from "../../../components/home/button";

function ChangePassword(props) {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const changPassword = ()=>{
        if(currentPassword === ""){
            alert("Current password is required");
            return;
        }
        if(newPassword === ""){
            alert("New password is required");
            return;
        }
        if(confirmNewPassword === ""){
            alert("Confirm new password is required");
            return;
        }
        if(newPassword !== confirmNewPassword){
            alert("New password and confirm new password must be the same");
            return;
        }
        alert("Change password successfully");
    }

    return (
        <View style={bgStyle.backGround}>
            <View className={"items-center"} style={bgStyle.bodyPage}>
                <InputField label={"Current password"} value={currentPassword} onChange={setCurrentPassword}  isSecure={true}/>
                <InputField label={"New password"} value={newPassword} onChange={setNewPassword}  isSecure={true}/>
                <InputField label={"Confirm new password"} value={confirmNewPassword} onChange={setConfirmNewPassword}  isSecure={true}/>

                <Button text={"Change Password"} onPress={()=>{changPassword()}}></Button>
            </View>
        </View>
    );
}

export default ChangePassword;