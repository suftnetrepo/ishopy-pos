/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { queryStockById,queryStockByProductId, insertStock,updateStock,deleteStock } from "../model/stock";
import { Stock } from "../model/types";

interface Initialize {
	data: Stock[] | null | Stock | [] | boolean;
	error: Error | null;
	loading: boolean;
}

const useStocks = (product_id: number) => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const result = await queryStockByProductId(product_id);
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

const useQueryStockById = (stock_id: number) => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const result = await queryStockById(stock_id);
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

const useInsertStock = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const insertHandler = async (
		product_id: number, stock: number = 0
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const result = await insertStock(product_id, stock);
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

const useUpdateStock = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const updateHandler = async (
		stock_id: number,
		product_id: number,
		stock: number
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const user = await updateStock(stock_id, product_id, stock);
			setData({
				data: user,
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
		update: updateHandler,
	};
};

const useDeleteStock = () => {
	const [data, setData] = useState<{
		data: boolean;
		error: Error | null;
		loading: boolean;
	}>({
		data: false,
		error: null,
		loading: true,
	});

	const deleteHandler = async (category_id: number) => {
		setData((prev) => ({ ...prev, loading: true }));
		try {
			const result = await deleteStock(category_id);
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

export { useDeleteStock, useUpdateStock, useInsertStock, useQueryStockById, useStocks };
