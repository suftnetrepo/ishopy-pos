/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter } from 'tp-react-native-bluetooth-printer';
import printReceipt from '../utiles/printReceipt';

const useBluetoothPrinter = () => {
const [isEnabled, setIsEnabled] = useState(false);
const [devices, setDevices] = useState([]);
const [connectedDevice, setConnectedDevice] = useState(null)

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

const testPrint = () => {
    BluetoothEscposPrinter.printText("Hello, world!\n\r", {});
};

const print = (receiptData) => {
    printReceipt(receiptData)
};

return {
    isEnabled,
    devices,
    connectedDevice,
    enableBluetooth,
    connectDevice,
    testPrint,
    print
}}

export { useBluetoothPrinter }
