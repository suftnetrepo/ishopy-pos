/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { queryUsers, insertUser, updateUser, deleteUser } from "../model/user";
import { User } from "../model/types";

interface Initialize {
	data: User[] | [] | null | User;
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
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const user = await insertUser(username, password, role);
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
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const user = await updateUser(user_id, username, password, role);
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

export { useUser, useInsertUser, useUpdateUser, useDeleteUser };
