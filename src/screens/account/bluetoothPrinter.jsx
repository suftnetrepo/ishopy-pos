/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Button, Text, FlatList, PermissionsAndroid, Platform, Alert } from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter } from 'tp-react-native-bluetooth-printer';

const BluetoothPrinter = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [devices, setDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                ]);
                if (
                    granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    checkBluetoothStatus();
                } else {
                    Alert.alert('Permissions not granted');
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            checkBluetoothStatus();
        }
    };

    const checkBluetoothStatus = () => {
        BluetoothManager.isBluetoothEnabled().then(enabled => {
            setIsEnabled(enabled);
        });
    };

    const enableBluetooth = () => {
        BluetoothManager.enableBluetooth().then(devices => {           
            setDevices(devices.map(deviceStr => JSON.parse(deviceStr)));
        });
    };

    const connectDevice = (device) => {
        BluetoothManager.connect(device.address)
            .then(() => {
                setConnectedDevice(device);
            })
            .catch(err => console.warn(err));
    };

    const printText = () => {
        BluetoothEscposPrinter.printText("Hello, world!\n\r", {});
    };

    return (
        <View>
            <Text>Bluetooth is {isEnabled ? 'Enabled' : 'Disabled'}</Text>
            <Button title="Enable Bluetooth" onPress={enableBluetooth} />
            {
                devices.map((item, index) => {
  

                    return (
                        <View key={index}>
                            <Text>{item.name}</Text>
                            <Button title="Connect" onPress={() => connectDevice(item)} />
                        </View>
                    )
                })
            }
            {/* <FlatList
                data={devices}
                keyExtractor={item => item.address}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Button title="Connect" onPress={() => connectDevice(item)} />
                    </View>
                )}
            /> */}
            {connectedDevice && <Button title="Print Text" onPress={printText} />}
        </View>
    );
};

export default BluetoothPrinter;
