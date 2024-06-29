/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';
import {
  queryAllOrders,
  queryOrderById,
  insertOrder,
  deleteOrder,
} from '../model/orders';
import {Order} from '../model/types';

interface Initialize {
  data: Order[] | null | Order | [] | boolean;
  error: Error | null;
  loading: boolean;
}

const useOrders = () => {
  const [data, setData] = useState<Initialize>({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const result = await queryAllOrders();
        setData(prev => ({
          ...prev,
          data: result,
          loading: false,
        }));
      } catch (error) {
        setData({
          data: null,
          error: error as Error,
          loading: false,
        });
      }
    }
    load();
  }, []);

  return {
    data: data.data,
    error: data.error,
  };
};

const useQueryOrderById = (order_id: number) => {
  const [data, setData] = useState<Initialize>({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const result = await queryOrderById(order_id);
        setData(prev => ({
          ...prev,
          data: result,
          loading: false,
        }));
      } catch (error) {
        setData({
          data: null,
          error: error as Error,
          loading: false,
        });
      }
    }
    load();
  }, []);

  return {
    data: data.data,
    error: data.error,
  };
};

const useInsertOrder = () => {
  const [data, setData] = useState<Initialize>({
    data: null,
    error: null,
    loading: true,
  });

  const insertHandler = async (order: Omit<Order, 'order_id'>) => {
    setData(prev => ({...prev, loading: true}));

    try {
      const result = await insertOrder(order);
      setData({
        data: result,
        error: null,
        loading: false,
      });
    } catch (error) {
      setData({
        data: null,
        error: error as Error,
        loading: false,
      });
    }
  };

  return {
    ...data,
    insert: insertHandler,
  };
};

const useDeleteOrder = () => {
  const [data, setData] = useState<{
    data: boolean;
    error: Error | null;
    loading: boolean;
  }>({
    data: false,
    error: null,
    loading: true,
  });

  const deleteHandler = async (order_id: number) => {
    setData(prev => ({...prev, loading: true}));
    try {
      const result = await deleteOrder(order_id);
      setData({
        data: result,
        error: null,
        loading: false,
      });
    } catch (error) {
      setData({
        data: false,
        error: error as Error,
        loading: false,
      });
    }
  };

  return {
    ...data,
    delete: deleteHandler,
  };
};

export {useDeleteOrder, useInsertOrder, useQueryOrderById, useOrders};
