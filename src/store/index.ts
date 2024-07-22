/* eslint-disable prettier/prettier */
import { observable } from '@legendapp/state';

interface appState {
    payment_status: boolean;
}

const initialize = {
    payment_status: false
};

const state = observable<appState>(initialize);

const useUtil = () => {
    const clearPaymentStatus = () => {
        state.set(initialize);
    };

    const setPaymentStatus = (value: boolean) => {
        state.payment_status.set(value);
    };

    const getPaymentStatus = () => {
      return state.payment_status.get();
    };

    return {
      clearPaymentStatus,
      getPaymentStatus,
      setPaymentStatus,
    };
}

export {useUtil, state};