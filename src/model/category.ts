/* eslint-disable prettier/prettier */
import { getRealmInstance } from './store';

export interface Category {
  category_id: number;
  name: string;
  status: number;
}

const insertCategory = async (
  name: string,
  status: number = 0,
): Promise<Category> => {
  const realm = await getRealmInstance()
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const category: Category = {
          category_id: Math.floor(Math.random() * 1000000), // Replace with a proper id generator
          name,
          status,
        };
        realm.create('Category', category);
        resolve(category);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const queryAllCategories = async (): Promise<Category[]> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const categories = realm
        .objects<Category>('Category')
        .sorted('name')
        .map(category => ({
          category_id: category.category_id,
          name: category.name,
          status: category.status,
        }));
      resolve(categories);
    } catch (error) {
      reject(error);
    }
  });
};

const queryCategoriesByStatus = async (status: number): Promise<Category[]> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const categories = realm
        .objects<Category>('Category')
        .filtered('status == $0', status)
        .sorted('name')
        .map(category => ({
          category_id: category.category_id,
          name: category.name,
          status: category.status,
        }));
      resolve({...categories});
    } catch (error) {
      reject(error);
    }
  });
};

const queryCategoryById = async (category_id: number): Promise<Category | null> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const category = realm.objectForPrimaryKey<Category>(
        'Category',
        category_id,
      );
      resolve(
        category
          ? {
            category_id: category.category_id,
            name: category.name,
            status: category.status,
          }
          : null,
      );
    } catch (error) {
      reject(error);
    }
  });
};

const updateCategory = async (
  category_id: number,
  name: string,
  status: number,
): Promise<Category> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const category = realm.objectForPrimaryKey<Category>(
          'Category',
          category_id,
        );
        if (category) {
          category.name = name;
          category.status = status;
          resolve(category);
        } else {
          reject(new Error('Category not found'));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCategory = async (category_id: number): Promise<boolean> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const products = realm
        .objects('Product')
        .filtered('category_id == $0', category_id);
      if (products.length > 0) {
        reject(
          new Error(
            'Cannot delete category: Products are associated with this category.',
          ),
        );
      } else {
        realm.write(() => {
          const category = realm.objectForPrimaryKey<Category>(
            'Category',
            category_id,
          );
          if (category) {
            realm.delete(category);
            resolve(true);
          } else {
            reject(new Error('Category not found'));
          }
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export {
  insertCategory,
  updateCategory,
  queryAllCategories,
  queryCategoryById,
  deleteCategory,
  queryCategoriesByStatus,
};