import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import Button from '@/components/home/button';
import fontStyles from '@/styles/fontStyles';

type LogoutModalProps = {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function Logout({ visible, onConfirm, onCancel }: LogoutModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <Pressable style={styles.overlay} onPress={onCancel}>
                <View style={styles.modalContainer}>
                    <Text style={[fontStyles.Title, styles.modalText]}>
                        Are you sure you want to log out?
                    </Text>
                    <View className={""} style={styles.modalButtons}>
                        <Button text="Yes" onPress={onConfirm} buttonClassName={"w-2/5"}/>
                        <Button text="No" onPress={onCancel} buttonClassName={"w-2/5"}/>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
