/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import {getRealmInstance} from './store';

import { Order } from './orders';
import { Product } from './product';
import { OrderItem } from './orderItems';

export interface ProductSalesData {
    product_id: number;
    name: string;
    total_sold: number;
}

export interface WeeklyTransactionsData {
  weekday: number;
  total: number;
}

const getBestSellingProducts = async (
    limit: number = 10
): Promise<ProductSalesData[]> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            const orderItems = realm.objects<OrderItem>('OrderItem');
            const productSales: {
                [key: number]: { product_id: number; name: string; total_sold: number };
            } = {};

            orderItems.forEach(orderItem => {
                if (productSales[orderItem.product_id]) {
                    productSales[orderItem.product_id].total_sold += orderItem.quantity;
                } else {
                    const product = realm.objectForPrimaryKey<Product>(
                        'Product',
                        orderItem.product_id
                    );
                    productSales[orderItem.product_id] = {
                        product_id: orderItem.product_id,
                        name: product ? product.name : 'Unknown',
                        total_sold: orderItem.quantity,
                    };
                }
            });

            const sortedProducts = Object.values(productSales)
                .sort((a, b) => b.total_sold - a.total_sold)
                .slice(0, limit);
            resolve(sortedProducts);
        } catch (error) {
            reject(error);
        } 
    });
};

const getDailyTransaction = async (): Promise<number> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            const today = new Date().toISOString().split('T')[0];           
            const result = realm
              .objects<Order>('Order')
              .filtered('date BEGINSWITH $0', today)
              .sum('total_price');              
            resolve(result);
        } catch (error) {
            reject(error);
        } 
    });
};

const getDailyTransactionPercentageChange = async (): Promise<number> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            const todayStr = today.toISOString().split('T')[0];
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            const todayTotal = realm
              .objects<Order>('Order')
              .filtered('date BEGINSWITH $0', todayStr)
              .sum('total_price');
            const yesterdayTotal = realm
              .objects<Order>('Order')
              .filtered('date BEGINSWITH  $0', yesterdayStr)
              .sum('total_price');

            const percentageChange =
                ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100;
            resolve(percentageChange);
        } catch (error) {
            reject(error);
        } 
    });
};

const getMonthlySales = async (): Promise<number> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            const currentMonth = new Date().toISOString().split('T')[0].slice(0, 7);
            const result = realm
                .objects<Order>('Order')
                .filtered('date BEGINSWITH $0', currentMonth)
                .sum('total_price');
            resolve(result);
        } catch (error) {
            reject(error);
        } 
    });
};

const getLowStocks = async (threshold: number = 10): Promise<number> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            const result = realm
                .objects<Product>('Product')
                .filtered('stock < $0', threshold);
            resolve(result.length);
        } catch (error) {
            reject(error);
        } 
    });
};

const getWeeklyTransactions = async (): Promise<
    WeeklyTransactionsData[]
> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 6);
            const lastWeekStr = lastWeek.toISOString().split('T')[0];

            const orders = realm
                .objects<Order>('Order')
                .filtered('date >= $0', lastWeekStr);

            const result = orders
                .map(order => ({
                    weekday: new Date(order.date).getDay(),
                    total: order.total_price,
                }))
                .reduce<{ weekday: number; total: number }[]>((acc, curr) => {
                    const existingDay = acc.find(day => day.weekday === curr.weekday);
                    if (existingDay) {
                        existingDay.total += curr.total;
                    } else {
                        acc.push({ weekday: curr.weekday, total: curr.total });
                    }
                    return acc;
                }, [])
                .sort((a, b) => a.weekday - b.weekday);

            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};


const getPreviousDayTransaction = async (): Promise<number> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            const result = realm
              .objects<Order>('Order')
              .filtered('date BEGINSWITH $0', yesterdayStr)
              .sum('total_price');
            resolve(result);
        } catch (error) {
            reject(error);
        } 
    });
};

const getDailyTransactionTrend = (): Promise<{
    dailyTransaction: number;
    trend: string;
}> => {
    return new Promise((resolve, reject) => {
        Promise.all([getDailyTransaction(), getPreviousDayTransaction()])
            .then(([dailyTransaction, previousDayTransaction]) => {
                let trend = 'neutral';
                if (dailyTransaction > previousDayTransaction) {
                    trend = 'up';
                } else if (dailyTransaction < previousDayTransaction) {
                    trend = 'down';
                }
                resolve({ dailyTransaction, trend });
            })
            .catch(error => reject(error));
    });
};

export {
    getBestSellingProducts,
    getDailyTransactionPercentageChange,
    getLowStocks,
    getMonthlySales,
    getWeeklyTransactions,
    getDailyTransaction,
    getPreviousDayTransaction,
    getDailyTransactionTrend
};
