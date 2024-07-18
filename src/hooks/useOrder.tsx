/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import {
	queryAllOrders,
	queryOrderById,
	insertOrder,
	deleteOrder,
} from "../model/orders";
import { Order, OrderItem, Payment } from "../model/types";
import { insertOrderItem } from "../model/orderItems";
import { useAppContext } from "./appContext";
import { insertPayment } from "../model/payments";
import { guid } from "../utils/help";
import { printReceipt } from "../utils/printReceipt";

interface Initialize {
	data: Order[] | null | Order | [] | boolean;
	error: Error | null;
	loading: boolean;
}

const order: Order = {
	order_id: "",
	user_id: "",
	total_price: 0,
	status: "pending",
	tax: 0,
	discount: 0,
	date: new Date().toISOString(),
};

const payment: Payment = {
	id: "",
	payment_method: "",
	order_id: "",
	amount: 0,
	date: new Date().toISOString(),
};

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
				setData((prev) => ({
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

	const resetHandler = () => {
		setData({
			data: null,
			error: null,
			loading: false,
		});
	};

	return {
		...data,
		resetHandler
	};
};

const useQueryOrderById = (order_id: string) => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: false,
	});

	useEffect(() => {
		async function load() {
			try {
				const result = await queryOrderById(order_id);
				setData((prev) => ({
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
		...data
	};
};

const useInsertOrder = () => {
	const {
		user,
		getItems,
		getTotal,
		getTotalPrice,
		getTotalTax,
		getTotalDiscount,
		shop,
	} = useAppContext();
	const items = getItems();
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: false,
	});

	const insertHandler = async (order: Order) => {
		setData((prev) => ({ ...prev, loading: true }));

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

	const orderHandler = async () => {
		setData((prev) => ({ ...prev, loading: true }));
		try {
			order.order_id = guid();
			order.user_id = user?.user_id;
			order.discount = getTotalDiscount() || 0;
			order.tax = getTotalTax() || 0;
			order.status = "completed";
			order.total_price = getTotalPrice() || 0;

			const orderResult = await insertOrder(order);

			if (orderResult) {
				for (const item of items) {
					const orderItem: OrderItem = {
						detail_id: guid(),
						order_id: orderResult.order_id,
						price: item.price,
						product_id: item.id,
						quantity: 1,
						date: new Date().toISOString(),
					};

					await insertOrderItem(orderItem);
				}
			}

			payment.id = guid();
			payment.amount = order.total_price;
			payment.order_id = orderResult.order_id;
			payment.payment_method = "Cash";

			await insertPayment(payment);

			setData({
				data: orderResult,
				error: null,
				loading: false,
			});

			return true;
		} catch (error) {
			setData({
				data: null,
				error: error as Error,
				loading: false,
			});
		}
	};

	const printHandler = (order: Order) => {
		try {
			const receiptTestData = {
				name: shop?.name,
				address: shop?.address,			
				phone: shop?.mobile,
				email: shop?.email,
				orderNumber: order.order_id.slice(0, 8),
				date: order.date,
				cashier: `${user?.first_name} ${user?.last_name}`,
				items: items.map((item) => ({
					quantity: item.quantity,
					name: item.name,
					total: item.price,
				})),
				subtotal: getTotal(),
				tax: getTotalTax(),
				discount: getTotalDiscount(),
				total: getTotalPrice(),
				footerMessage:
					"Your satisfaction is our priority. Thank you for shopping with us!",
			};
			printReceipt(receiptTestData);
		} catch (error) {
			setData({
				data: null,
				error: error as Error,
				loading: false,
			});
		}
	};

	const resetHandler = () => {
		setData({
			data: null,
			error: null,
			loading: false,
		});
	};

	return {
		...data,
		insert: insertHandler,
		orderHandler,
		resetHandler,
		printHandler,
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
		loading: false,
	});

	const deleteHandler = async (order_id: string) => {
		setData((prev) => ({ ...prev, loading: true }));
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

export { useDeleteOrder, useInsertOrder, useQueryOrderById, useOrders };
