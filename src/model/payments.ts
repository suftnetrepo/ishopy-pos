/* eslint-disable prettier/prettier */
import {getRealmInstance} from './store';

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  payment_method: string;
  date: string;
}

const insertPayment = async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
  const realm = await getRealmInstance()
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newPayment: Payment = {
          id: Math.floor(Math.random() * 1000000), // Replace with a proper id generator
          ...payment,
        };
        realm.create('Payment', newPayment);
        resolve(newPayment);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const queryAllPayments = async (): Promise<Payment[]> => {
    const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const payments = realm.objects<Payment>('Payment').map(payment => ({
        id: payment.id,
        order_id: payment.order_id,
        amount: payment.amount,
        payment_method: payment.payment_method,
        date: payment.date,
      }));
      resolve(payments);
    } catch (error) {
      reject(error);
    }
  });
};

const queryPaymentById = async (id: number): Promise<Payment | null> => {
    const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const payment = realm.objectForPrimaryKey<Payment>('Payment', id);
      resolve(
        payment
          ? {
              id: payment.id,
              order_id: payment.order_id,
              amount: payment.amount,
              payment_method: payment.payment_method,
              date: payment.date,
            }
          : null,
      );
    } catch (error) {
      reject(error);
    }
  });
};

const queryPaymentsByOrderId = async (order_id: number): Promise<Payment[]> => {
    const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const payments = realm
        .objects<Payment>('Payment')
        .filtered('order_id == $0', order_id)
        .map(payment => ({
          id: payment.id,
          order_id: payment.order_id,
          amount: payment.amount,
          payment_method: payment.payment_method,
          date: payment.date,
        }));
      resolve(payments);
    } catch (error) {
      reject(error);
    }
  });
};

const deletePayment = async (id: number): Promise<boolean> => {
    const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const payment = realm.objectForPrimaryKey<Payment>('Payment', id);
        if (payment) {
          realm.delete(payment);
          resolve(true);
        } else {
          reject(new Error('Payment not found'));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const queryPaymentsByDateRange = async (
  startDate: string,
  endDate: string,
): Promise<Payment[]> => {
    const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const payments = realm
        .objects<Payment>('Payment')
        .filtered('date >= $0 AND date <= $1', startDate, endDate)
        .map(payment => ({
          id: payment.id,
          order_id: payment.order_id,
          amount: payment.amount,
          payment_method: payment.payment_method,
          date: payment.date,
        }));
      resolve(payments);
    } catch (error) {
      reject(error);
    }
  });
};

export {
  insertPayment,
  queryAllPayments,
  queryPaymentById,
  queryPaymentsByOrderId, 
  deletePayment,
  queryPaymentsByDateRange,
};
