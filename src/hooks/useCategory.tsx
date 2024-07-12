/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { queryAllCategories, queryCategoriesByStatus, queryCategoryById, deleteCategory, insertCategory, updateCategory } from "../model/category";
import { Category } from "../model/types";
interface Initialize {
	data: Category[] | null | Category | [] | boolean;
	error: Error | null;
	loading: boolean;
}

const useCategories = () => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	async function loadCategories() {
		try {
			const result = await queryAllCategories();
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

	useEffect(() => {		
		loadCategories();
	}, []);

	return {
		...data,
		loadCategories
	};
};

const useQueryCategoriesByStatus = async (status: number) => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const results = await queryCategoriesByStatus(status);
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
		...data
	};
};

const useQueryCategoryById = async (category_id: number) => {
	const [data, setData] = useState<Initialize>({
		data: [],
		error: null,
		loading: true,
	});

	useEffect(() => {
		async function load() {
			try {
				const results = await queryCategoryById(category_id);
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
		...data
	};
};


const useInsertCategory = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const insertCategoryHandler = async (
		name: string,
		status: number = 0,
		color_code : string
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const result = await insertCategory(name, status, color_code);
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
		insertCategory: insertCategoryHandler,
	};
};

const useUpdateCategory = () => {
	const [data, setData] = useState<Initialize>({
		data: null,
		error: null,
		loading: true,
	});

	const updateCategoryHandler = async (
		category_id: number,
		name: string,
		status: number,
		color_code : string
	) => {
		setData((prev) => ({ ...prev, loading: true }));

		try {
			const user = await updateCategory(category_id, name, status, color_code);
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
		updateCategory: updateCategoryHandler,
	};
};

const useDeleteCategory = () => {
	const [data, setData] = useState<{
		data: boolean;
		error: Error | null;
		loading: boolean;
	}>({
		data: false,
		error: null,
		loading: true,
	});

	const deleteCategoryHandler = async (category_id: number) => {
		setData((prev) => ({ ...prev, loading: true }));
		try {
			const result = await deleteCategory(category_id);
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
		deleteCategory: deleteCategoryHandler,
	};
};

export { useInsertCategory, useUpdateCategory, useQueryCategoriesByStatus, useQueryCategoryById, useDeleteCategory, updateCategory, useCategories };
