/* eslint-disable prettier/prettier */
import Realm, { ObjectSchema } from 'realm';
import { createRealmContext } from '@realm/react';

let realmInstance: Realm | null = null;

export const ProductSchema: ObjectSchema = {
  name: 'Product',
  primaryKey: 'product_id',
  properties: {
    product_id: 'int',
    name: 'string',
    bar_code: 'string?',
    color_code: 'string?',
    price: 'double',
    price_offer: { type: 'double', default: 0 },
    cost: { type: 'double', default: 0 },
    stock: { type: 'int', default: 0 },
    category_id: 'int?',
    status: { type: 'int', default: 0 },
  },
};

export const StockSchema: ObjectSchema = {
  name: 'Stock',
  primaryKey: 'stock_id',
  properties: {
    stock_id: 'int',
    product_id: 'int',
    stock: { type: 'int', default: 0 },
  },
};

export const CategorySchema: ObjectSchema = {
  name: 'Category',
  primaryKey: 'category_id',
  properties: {
    category_id: 'int',
    name: 'string',
    status: { type: 'int', default: 0 },
  },
};

export const OrderSchema: ObjectSchema = {
  name: 'Order',
  primaryKey: 'order_id',
  properties: {
    order_id: 'int',
    user_id: 'int?',
    total_price: 'double',
    customer_id: 'int?',
    status: 'string?',
    date: 'string?',
  },
};

export const OrderItemSchema: ObjectSchema = {
  name: 'OrderItem',
  primaryKey: 'detail_id',
  properties: {
    detail_id: 'int',
    order_id: 'int',
    product_id: 'int',
    quantity: 'int',
    price: 'double',
    date: 'string?',
  },
};

export const UserSchema: ObjectSchema = {
  name: 'User',
  primaryKey: 'user_id',
  properties: {
    user_id: 'int',
    username: 'string',
    password: 'string',
    role: 'string',
  },
};

export const CustomerSchema: ObjectSchema = {
  name: 'Customer',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string?',
    email: 'string?',
    phone: 'string?',
  },
};

export const PaymentSchema: ObjectSchema = {
  name: 'Payment',
  primaryKey: 'id',
  properties: {
    id: 'int',
    order_id: 'int',
    amount: 'double',
    payment_method: 'string?',
    date: 'string?',
  },
};

const { useRealm, useQuery, RealmProvider } = createRealmContext({
  schema: [
    PaymentSchema,
    ProductSchema,
    CategorySchema,
    CustomerSchema,
    StockSchema,
    UserSchema,
    OrderItemSchema,
    OrderSchema,
  ],
  deleteRealmIfMigrationNeeded: true,
});

const schema = [
  PaymentSchema,
  ProductSchema,
  CategorySchema,
  CustomerSchema,
  StockSchema,
  UserSchema,
  OrderItemSchema,
  OrderSchema,
];

const RealmOptions = () => {
  return {
    path: 'pos.realm',
    schema: schema,
    schemaVersion: 0,
  };
};

const RealmOpen = async () => {
  return await Realm.open(RealmOptions());
}

const getRealmInstance = async () => {
  if (!realmInstance) {
    realmInstance = await RealmOpen();
  }
  return realmInstance;
};

export {
  schema,
  RealmOpen,
  RealmOptions,
  useRealm,
  useQuery,
  RealmProvider,
  Realm,
  getRealmInstance,
};
