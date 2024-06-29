/* eslint-disable prettier/prettier */
import {getRealmInstance} from './store';

export interface Order {
  order_id: number;
  user_id: number;
  total_price: number;
  customer_id?: number;
  status: string;
  date: string;
}

const insertOrder = async (order: Omit<Order, 'order_id'>): Promise<Order> => {
     const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newOrder: Order = {
          order_id: Math.floor(Math.random() * 1000000), // Replace with a proper id generator
          ...order,
        };
        realm.create('Order', newOrder);
        resolve(newOrder);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const queryAllOrders = async(): Promise<Order[]> => {
       const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const orders = realm
        .objects<Order>('Order')
        .sorted('date', true)
        .map(order => ({
          order_id: order.order_id,
          user_id: order.user_id,
          total_price: order.total_price,
          customer_id: order.customer_id,
          status: order.status,
          date: order.date,
        }));
      resolve(orders);
    } catch (error) {
      reject(error);
    } 
  });
};

const queryOrderById = async(order_id: number): Promise<Order | null> => {
       const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const order = realm.objectForPrimaryKey<Order>('Order', order_id);
      resolve(
        order
          ? {
              order_id: order.order_id,
              user_id: order.user_id,
              total_price: order.total_price,
              customer_id: order.customer_id,
              status: order.status,
              date: order.date,
            }
          : null
      );
    } catch (error) {
      reject(error);
    } 
  });
};

const deleteOrder = async (order_id: number): Promise<boolean> => {
       const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const orderItemsCount = realm
        .objects('OrderItem')
        .filtered('order_id == $0', order_id).length;
      if (orderItemsCount > 0) {
        reject(
          new Error(
            'Cannot delete order: Order items are associated with this order.'
          )
        );
      } else {
        realm.write(() => {
          const order = realm.objectForPrimaryKey<Order>('Order', order_id);
          if (order) {
            realm.delete(order);
            resolve(true);
          } else {
            reject(new Error('Order not found'));
          }
        });
      }
    } catch (error) {
      reject(error);
    } 
  });
};

export {insertOrder, deleteOrder, queryAllOrders, queryOrderById};
