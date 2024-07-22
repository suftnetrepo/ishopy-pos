/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react';
import { requestPurchase, useIAP } from 'react-native-iap';
import { STORAGE_KEYS, store, getStore } from '../utils/asyncStorage';import { seedData, clearSeedData } from '../model/seed';
import { useUtil } from '../store';

const { PURCHASED_STATUS } = STORAGE_KEYS;

const useInAppPurchase = () => {
    const { setPaymentStatus } = useUtil()
    const [data, setData] = useState({
        error: null,
        loading: false,
        status: false
    })

    const {
        connected,
        products,
        getProducts,
        finishTransaction,
        currentPurchase,
        currentPurchaseError,
        purchaseHistory,
        getPurchaseHistory
    } = useIAP();

    useEffect(() => {
        async function init() {
            const status = await getStore(PURCHASED_STATUS)
                               
            if (!status) {                          
                await getPurchaseHistory()
            }

            setData({
                status: status === 0 || status === null ? false : true,
                error: null,
                loading: false,
            });
        }
        init()
    }, [])

    useEffect(() => {
        const processPurchase = async () => {
            if (currentPurchase?.transactionReceipt) {               
                try {
                    await finishTransaction(currentPurchase);
                    store(PURCHASED_STATUS, 1)
                    await clearSeedData()
                    setPaymentStatus(true)
                    setData({
                        status: true,
                        error: null,
                        loading: false,
                    });
                } catch (error) {
                    setData({
                        status: false,
                        error,
                        loading: false,
                    });
                }
            }
        };

        processPurchase();
    }, [currentPurchase])

    useEffect(() => {
        setData({
            status: currentPurchaseError?.code === "E_ALREADY_OWNED" ? true : false,
            error: currentPurchaseError,
            loading: false,
        });
    }, [currentPurchaseError]);

    useEffect(() => {       
        async function init() {           
            const purchases = purchaseHistory?.filter((product) => product.productId === "ishopy_sa_premium_upgrade")       
            if (purchases && data.status !== 1) {
                await store(PURCHASED_STATUS, 1)                 
            } else {                              
                await seedData()
            }
        }
        init()      
    }, [purchaseHistory, data]);

    const purchaseHandler = async () => {
        if (!connected) {
            setData({
                status: false,
                error: 'Please check your internet connection',
                loading: false,
            });
            return;
        }

        try {
            await getProducts({ skus: ['ishopy_sa_premium_upgrade'] })
            if (products?.length > 0) {
                await requestPurchase({ skus: ['ishopy_sa_premium_upgrade'] });
            }
        } catch (error) {
            setData({
                status: false,
                error,
                loading: false,
            });
        }
    };

    return {
        ...data,
        purchaseHandler,
    };
};

export { useInAppPurchase };
