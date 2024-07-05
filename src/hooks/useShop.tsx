/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { queryAllShops, insertShop, updateShop, deleteShop } from "../model/shop";
import { Shop } from "../model/types";

interface Initialize {
	data: Shop[] | [] | null | Shop ;
	error: Error | null;
	loading: boolean;
}

interface User extends Shop {	
	first_name: string;
	last_name: string;
	user_name: string;	
	password: string;	
	role: 'admin';
	pass_code: number;
}

const useShop = () => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const shop = await queryAllShops();
				setData(prev => ({
					...prev,
					data: shop,
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
		...data.data
	};
};

const useInsertShop = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const insertHandler = async (
		shop: User
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const user = await insertShop(shop);
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
		insertHandler,
	};
};

const useUpdateShop = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const updateHandler = async (
		shop: User
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const user = await updateShop(shop);
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
		updateHandler,
	};
};

const useDeleteShop = () => {
	const [data, setData] = useState<{
		data: boolean;
		error: Error | null;
		loading: boolean;
	}>({
		data: false,
		error: null,
		loading: true,
	});

	const deleteHandler = async (shop_id: number) => {
		setData((prev) => ({ ...prev, loading: true }));
		try {
			const user = await deleteShop(shop_id);
			setData({
				data: user,
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
		deleteHandler,
	};
};


export { useDeleteShop, useUpdateShop, useInsertShop, useShop };
