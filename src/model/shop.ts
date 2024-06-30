/* eslint-disable prettier/prettier */
import { getRealmInstance } from './store';

export interface Shop {
  shop_id: number;
  name: string;
  mobile: string;
  email: string;
  address: string;
  description: string;
}

const insertShop = async (
  shop: Omit<Shop, 'shop_id'>
): Promise<Shop> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const newShop = {
          shop_id: Math.floor(Math.random() * 1000000),
          ...shop,
        };
        realm.create('Shop', newShop);
        resolve(newShop);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const queryAllShops = async (): Promise<Shop[]> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const shops = realm
        .objects<Shop>('Shop')
        .sorted('name')
        .map(shop => ({
          shop_id: shop.shop_id,
          name: shop.name,
          mobile: shop.mobile,
          email: shop.email,
          address: shop.address,
          description: shop.description,
        }));
      resolve(shops);
    } catch (error) {
      reject(error);
    }
  });
};

const queryShopById = async (shop_id: number): Promise<Shop | null> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      const shop = realm.objectForPrimaryKey<Shop>('Shop', shop_id);
      resolve(
        shop
          ? {
              shop_id: shop.shop_id,
              name: shop.name,
              mobile: shop.mobile,
              email: shop.email,
              address: shop.address,
              description: shop.description,
            }
          : null
      );
    } catch (error) {
      reject(error);
    }
  });
};

const updateShop = async (
 shop : Shop
): Promise<Shop> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const updateShop = realm.objectForPrimaryKey<Shop>('Shop', shop.shop_id);
        if (updateShop) {
          (updateShop.name = shop.name),
            (updateShop.mobile = shop.mobile),
            (updateShop.email = shop.email),
            (updateShop.address = shop.address),
            (updateShop.description = shop.description),
            resolve(updateShop);
        } else {
          reject(new Error('Shop not found'));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteShop = async (shop_id: number): Promise<boolean> => {
  const realm = await getRealmInstance();
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        const shop = realm.objectForPrimaryKey<Shop>('Shop', shop_id);
        if (shop) {
          realm.delete(shop);
          resolve(true);
        } else {
          reject(new Error('Shop not found'));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export {
  insertShop,
  updateShop,
  queryAllShops,
  deleteShop,
  queryShopById,
};