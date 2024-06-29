/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import {
	queryAllProducts,
	queryProductByBarCode,
	queryProductByCategory,
	queryProductById,
	queryProductByStatus,
	insertProduct,
	updateProduct,
	deleteProduct,
} from "../model/product";
import { Product } from "../model/product";

interface Initialize {
	data: Product[] | null | Product | [] | boolean;
	error: Error | null;
	loading: boolean;
}

const useProducts = () => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const result = await queryAllProducts();
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
		data: data.data,
		error: data.error,
	};
};

const useQueryProductByStatus = async (status: number) => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const results = await queryProductByStatus(status);
				setData({
					data: results,
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
		}
		load();
	}, []);

	return {
		data: data.data,
		error: data.error,
	};
};

const useQueryProductByCategory = async (category_id: number) => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const results = await queryProductByCategory(category_id);
				setData({
					data: results,
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
		}
		load();
	}, []);

	return {
		data: data.data,
		error: data.error,
	};
};

const useQueryProductById = async (product_id: number) => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const results = await queryProductById(product_id);
				setData({
					data: results,
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
		}
		load();
	}, []);

	return {
		data: data.data,
		error: data.error,
	};
};

const useQueryProductByBarCode = async (bar_code: string) => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const results = await queryProductByBarCode(bar_code);
				setData({
					data: results,
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
		}
		load();
	}, []);

	return {
		data: data.data,
		error: data.error,
	};
};

const useInsertProduct = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const insertHandler = async (product: Omit<Product, "product_id">) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const result = await insertProduct(product);
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

const useUpdateProduct = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const updateHandler = async (product_id: number, product: Product) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const user = await updateProduct(product_id, product);
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

const useDeleteProduct = () => {
	const [data, setData] = useState<{
		data: boolean;
		error: Error | null;
		loading: boolean;
	}>({
		data: false,
		error: null,
		loading: true,
	});

	const deleteHandler = async (product_id: number) => {
		setData((prev) => ({ ...prev, loading: true }));
		try {
			const result = await deleteProduct(product_id);
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

export {
	useProducts,
	useQueryProductByStatus,
	useDeleteProduct,
	useInsertProduct,
	useQueryProductByBarCode,
	useQueryProductByCategory,
	useQueryProductById,
	useUpdateProduct,
};
