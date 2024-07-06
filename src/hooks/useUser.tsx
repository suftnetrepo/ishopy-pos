/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { queryUsers, insertUser, updateUser, deleteUser, loginUser, loginByPin } from "../model/user";
import { User, Shop } from "../model/types";
import { queryAllShops } from "../model/shop";

interface Initialize {
	data: User[] | [] | null | User | Shop;
	error: Error | null;
	loading: boolean;
}

const useUser = () => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const users = await queryUsers();
				setData(prev => ({
					...prev,
					data: users,
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

const useInsertUser = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const insertUserHandler = async (
		username: string,
		password: string,
		role: string,
		first_name: string,
		last_name: string,
		pass_code: number
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const user = await insertUser(first_name, last_name, username, password, role, pass_code);
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
		insertUser: insertUserHandler,
	};
};

const useUpdateUser = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const updateUserHandler = async (
		user_id: number,
		username: string,
		password: string,
		role: string,
		first_name: string,
		last_name: string,
		pass_code: number
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const user = await updateUser(first_name, last_name, user_id, username, password, role, pass_code);
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
		updateUser: updateUserHandler,
	};
};

const useDeleteUser = () => {
	const [data, setData] = useState<{
		data: boolean;
		error: Error | null;
		loading: boolean;
	}>({
		data: false,
		error: null,
		loading: true,
	});

	const deleteUserHandler = async (user_id: number) => {
		setData((prev) => ({ ...prev, loading: true }));
		try {
			const user = await deleteUser(user_id);
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
		deleteUser: deleteUserHandler,
	};
};

const useLogin = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: false,
	});

	const loginHandler = async (user_name: string, password : string) => {
		setData((prev) => ({ ...prev, loading: true }));
		try {
			const user = await loginUser(user_name, password);
			const shop = await queryAllShops()
			setData({
				data: user,
				error: null,
				loading: false,
			});

			return {
				user,
				shop
			} 
		} catch (error) {
			setData({
				data: null,
				error: error as Error,
				loading: false,
			});
		}		
	};

	const resetHandler= ()=>{
		setData({
			data: null,
			error: null,
			loading: false,
		});
	}

	return {
		...data,
		resetHandler,
		loginUser: loginHandler,
	};
};

const usePin = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: false,
	});

	const loginHandler = async (pin: number) => {
		setData((prev) => ({ ...prev, loading: true }));
		
		try {
			const user = await loginByPin(pin);
			setData({
				data: user,
				error: null,
				loading: false,
			});

			return user
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
	}

	return {
		...data,
		resetHandler,
		loginByPin: loginHandler,
	};
};

export { usePin, useLogin, useUser, useInsertUser, useUpdateUser, useDeleteUser };
