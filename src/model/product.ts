/* eslint-disable prettier/prettier */
import { getRealmInstance} from './store';

export interface Product {
  product_id: number;
  name: string;
  bar_code?: string;
  color_code?: string;
  price: number;
  price_offer?: number;
  cost?: number;
  stock?: number;
  category_id?: number;
  status?: number;
  description?: string;
}

const insertProduct = async (
  product: Omit<Product, 'product_id'>
): Promise<Product> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newProduct: Product = {
          product_id: Math.floor(Math.random() * 1000000),
          ...product,
        };
        realm.create('Product', newProduct);
        resolve(newProduct);
      });
    } catch (error) {
      reject(error);
    } 
  });
};

const queryAllProducts = async (
  sortBy: keyof Product = 'product_id',
  sortOrder: 'ASC' | 'DESC' = 'ASC'
): Promise<Product[]> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const products = realm
        .objects<Product>('Product')
        .sorted(sortBy, sortOrder === 'ASC')
        .map(product => ({
          product_id: product.product_id,
          name: product.name,
          bar_code: product.bar_code,
          color_code: product.color_code,
          price: product.price,
          price_offer: product.price_offer,
          cost: product.cost,
          stock: product.stock,
          category_id: product.category_id,
          status: product.status,
          description: product.description
        }));
      resolve(products);
    } catch (error) {
      reject(error);
    } 
  });
};

const queryProductByStatus = async (status: number = 1): Promise<Product[]> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const products = realm
        .objects<Product>('Product')
        .filtered('status == $0', status)
        .sorted('name')
        .map(product => ({
          product_id: product.product_id,
          name: product.name,
          bar_code: product.bar_code,
          color_code: product.color_code,
          price: product.price,
          price_offer: product.price_offer,
          cost: product.cost,
          stock: product.stock,
          category_id: product.category_id,
          status: product.status,
          description: product.description,
        }));
      resolve(products);
    } catch (error) {
      reject(error);
    } 
  });
};

const queryProductByCategory = async (category_id: number): Promise<Product[]> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const products = realm
        .objects<Product>('Product')
        .filtered('category_id == $0', category_id)
        .sorted('name')
        .map(product => ({
          product_id: product.product_id,
          name: product.name,
          bar_code: product.bar_code,
          color_code: product.color_code,
          price: product.price,
          price_offer: product.price_offer,
          cost: product.cost,
          stock: product.stock,
          category_id: product.category_id,
          status: product.status,
          description: product.description,
        }));
      resolve(products);
    } catch (error) {
      reject(error);
    } 
  });
};

const queryProductById = async (product_id: number): Promise<Product | null> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const product = realm.objectForPrimaryKey<Product>('Product', product_id);
      resolve(
        product
          ? {
              product_id: product.product_id,
              name: product.name,
              bar_code: product.bar_code,
              color_code: product.color_code,
              price: product.price,
              price_offer: product.price_offer,
              cost: product.cost,
              stock: product.stock,
              category_id: product.category_id,
              status: product.status,
              description: product.description,
            }
          : null
      );
    } catch (error) {
      reject(error);
    } 
  });
};

const queryProductByBarCode = async (bar_code: string): Promise<Product | null> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const product = realm
        .objects<Product>('Product')
        .filtered('bar_code == $0', bar_code)[0];
      resolve(
        product
          ? {
              product_id: product.product_id,
              name: product.name,
              bar_code: product.bar_code,
              color_code: product.color_code,
              price: product.price,
              price_offer: product.price_offer,
              cost: product.cost,
              stock: product.stock,
              category_id: product.category_id,
              status: product.status,
              description: product.description,
            }
          : null
      );
    } catch (error) {
      reject(error);
    } 
  });
};

const updateProduct = async (
  product_id: number,
  product: Product
): Promise<Product> => {
  const realm = await getRealmInstance(); 
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const existingProduct = realm.objectForPrimaryKey<Product>(
          'Product',
          product_id
        );
        if (existingProduct) {
            existingProduct.name = product.name;
            existingProduct.bar_code = product.bar_code;
            existingProduct.color_code = product.color_code;
            existingProduct.price = product.price;
            existingProduct.price_offer = product.price_offer;
            existingProduct.cost = product.cost;
            existingProduct.stock = product.stock;
            existingProduct.category_id = product.category_id;
            existingProduct.status = product.status;
            existingProduct.description=  product.description;
            resolve(existingProduct);
        } else {
          reject(new Error('Product not found'));
        }
      });
    } catch (error) {
      reject(error);
    } 
  });
};


const deleteProduct = async (product_id: number): Promise<boolean> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const product = realm.objectForPrimaryKey<Product>('Product', product_id);
        if (product) {
          realm.delete(product);
          resolve(true);
        } else {
          reject(new Error('Product not found'));
        }
      });
    } catch (error) {
      reject(error);
    } 
  });
};

export {
  insertProduct,
  updateProduct,
  queryAllProducts,
  queryProductByBarCode,
  queryProductById,
  deleteProduct,
  queryProductByStatus,
  queryProductByCategory,
};
