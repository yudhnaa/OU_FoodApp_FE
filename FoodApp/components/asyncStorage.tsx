import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeStringValue = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e)
        alert(`Error saving value ${e}`)
    }
};

export const getStringValue = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem('key');
        return value
    } catch (e) {
        console.log(e)
        alert(`Error reading value ${e}`)
    }
}

export const storeObjectValue = async (key: any, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e)
        alert(`Error saving value ${e}`)
    }
};

export const getObjectValue = async (key: any) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
        alert(`Error reading value ${e}`)
    }
}


export const removeValue = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log(e)
        alert(`Error removing value ${e}`)
    }
}

