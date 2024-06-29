/* eslint-disable prettier/prettier */
import {getRealmInstance} from './store';

export interface OrderItem {
  detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  date: string;
}

const insertOrderItem = async(
  orderItem: Omit<OrderItem, 'detail_id'>,
): Promise<OrderItem> => {
       const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newOrderItem: OrderItem = {
          detail_id: Math.floor(Math.random() * 1000000), // Replace with a proper id generator
          ...orderItem,
        };
        realm.create('OrderItem', newOrderItem);
        resolve(newOrderItem);
      });
    } catch (error) {
      reject(error);
    } 
  });
};

const queryOrderItemByOrderId = async(order_id: number): Promise<OrderItem[]> => {
       const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const orderItems = realm
        .objects<OrderItem>('OrderItem')
        .filtered('order_id == $0', order_id)
        .sorted('date', true)
        .map(orderItem => ({
          detail_id: orderItem.detail_id,
          order_id: orderItem.order_id,
          product_id: orderItem.product_id,
          quantity: orderItem.quantity,
          price: orderItem.price,
          date: orderItem.date,
        }));
      resolve(orderItems);
    } catch (error) {
      reject(error);
    } 
  });
};

const queryOrderItemById = async(detail_id: number): Promise<OrderItem | null> => {
       const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const orderItem = realm.objectForPrimaryKey<OrderItem>(
        'OrderItem',
        detail_id
      );
      resolve(
        orderItem
          ? {
              detail_id: orderItem.detail_id,
              order_id: orderItem.order_id,
              product_id: orderItem.product_id,
              quantity: orderItem.quantity,
              price: orderItem.price,
              date: orderItem.date,
            }
          : null
      );
    } catch (error) {
      reject(error);
    } 
  });
};

const deleteOrderItem = async(detail_id: number): Promise<boolean> => {
       const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const orderItem = realm.objectForPrimaryKey<OrderItem>(
          'OrderItem',
          detail_id
        );
        if (orderItem) {
          realm.delete(orderItem);
          resolve(true);
        } else {
          reject(new Error('OrderItem not found'));
        }
      });
    } catch (error) {
      reject(error);
    } 
  });
};

export {
  insertOrderItem,
  deleteOrderItem,
  queryOrderItemById,
  queryOrderItemByOrderId,
};
