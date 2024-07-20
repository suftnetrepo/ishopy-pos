/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { requestPurchase, useIAP } from 'react-native-iap';
import { STORAGE_KEYS, storeBooleanData, getBooleanData } from '../utils/asyncStorage';

const { IS_FULL_APP_PURCHASED } = STORAGE_KEYS;

// Define item SKUs based on platform
const itemSKUs = Platform.select({
    android: ['full_app', 'test_4'],
    ios: [], // Add iOS SKUs if needed
});

const useInAppPurchase = () => {
    const [isFullAppPurchased, setIsFullAppPurchased] = useState(false);
    const [connectionErrorMsg, setConnectionErrorMsg] = useState('');

    const {
        connected,
        products,
        getProducts,
        finishTransaction,
        currentPurchase,
        currentPurchaseError,
    } = useIAP();

    // Effect to handle fetching purchase status, products, and processing purchases/errors
    useEffect(() => {
        const initialize = async () => {
            try {
                // Fetch initial purchase status
                const data = await getBooleanData(IS_FULL_APP_PURCHASED);
                setIsFullAppPurchased(data);

                // Fetch products if connected
                if (connected) {
                    await getProducts(itemSKUs);
                }
            } catch (error) {
                console.error('Initialization error:', error);
                setConnectionErrorMsg('An error occurred during initialization.');
            }
        };

        initialize();
    }, [connected, getProducts]);

    useEffect(() => {
        const processPurchase = async () => {
            if (currentPurchase?.transactionReceipt) {
                console.log('Received receipt:', currentPurchase.transactionReceipt);
                setAndStoreFullAppPurchase(true);

                try {
                    await finishTransaction(currentPurchase);
                    console.log('Transaction acknowledged');
                } catch (error) {
                    console.error('Failed to acknowledge transaction:', error);
                }
            }
        };

        processPurchase();
    }, [currentPurchase])

    useEffect(() => {
        if (currentPurchaseError?.code === 'E_ALREADY_OWNED' && !isFullAppPurchased) {
            setAndStoreFullAppPurchase(true);
        } else if (currentPurchaseError) {
            console.error('Purchase error:', currentPurchaseError);
        }
    }, [currentPurchaseError, isFullAppPurchased]);

    const purchaseFullApp = async () => {
        if (!connected) {
            setConnectionErrorMsg('Please check your internet connection');
            return;
        }

        try {
            if (products?.length > 0) {
                await requestPurchase(itemSKUs[1]);
                console.log('Requested purchase');
            } else {
                await getProducts(itemSKUs);
                await requestPurchase(itemSKUs[1]);
                console.log('Requested purchase after fetching products');
            }
        } catch (error) {
            setConnectionErrorMsg('Failed to make purchase');
            console.error('Purchase request error:', error);
        }
    };

    const setAndStoreFullAppPurchase = (value) => {
        setIsFullAppPurchased(value);
        storeBooleanData(IS_FULL_APP_PURCHASED, value);
    };

    return {
        isFullAppPurchased,
        connectionErrorMsg,
        purchaseFullApp,
    };
};

export default useInAppPurchase;
