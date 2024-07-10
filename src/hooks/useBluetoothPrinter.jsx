/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BluetoothManager } from 'tp-react-native-bluetooth-printer';
import { printReceipt, receiptTestData } from '../utils/printReceipt';

const useBluetoothPrinter = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [devices, setDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null)
    const [selectedPrinter, setSelectedPrinter] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        requestPermissions();
         loadSelectedPrinter(); 
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
                setError(err)
            }
        } else {
            checkBluetoothStatus();
        }
    };

    const checkBluetoothStatus = () => {
        BluetoothManager.isBluetoothEnabled().then(enabled => {
            setIsEnabled(enabled);
        }).catch(err => setError(err));
    };

    const enableBluetooth = () => {
        BluetoothManager.enableBluetooth().then(devices => {
            setDevices(devices.map(deviceStr => JSON.parse(deviceStr)));
        }).catch(err => setError(err));
    };

    const connectDevice = (device) => {
        setLoading(true)
        BluetoothManager.connect(device.address)
            .then(() => {
                setConnectedDevice(device);
                saveSelectedPrinter(device); 
            })
            .catch(err => setError(err)).finally(() => {
                setLoading(false)
            })
    };

    const loadSelectedPrinter = async () => {
        try {
            const printer = await AsyncStorage.getItem('selectedPrinter');
            if (printer) {
                const parsedPrinter = JSON.parse(printer);
                setSelectedPrinter(parsedPrinter);
                connectDevice(parsedPrinter);
            }
        } catch (err) {
            setError(err);
        }
    };

    const saveSelectedPrinter = async (printer) => {
        try {
            await AsyncStorage.setItem('selectedPrinter', JSON.stringify(printer));
            setSelectedPrinter(printer);
        } catch (err) {
            setError(err);
        }
    };

    const testPrint = () => {
        printReceipt(receiptTestData)
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
        print,
        error,
        setError,
        loading,
        selectedPrinter      
    }
}

export { useBluetoothPrinter }
