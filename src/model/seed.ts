/* eslint-disable prettier/prettier */
import { getRealmInstance } from './store';
import {
  Order,
  OrderItem,
  Product,
  Customer,
  Category,
  User,
  Payment,
  Stock,
} from './types';

const seedData = async () => {
  const realm = await getRealmInstance();
  try {
    realm.write(() => {
      console.log('..................work at last')
      // realm.deleteAll();
           
      // Seed Users
      const users: User[] = [
        { user_id: 1, username: 'admin', password: 'admin123', role: 'admin' },
        { user_id: 2, username: 'user', password: 'user123', role: 'user' },
      ];
      users.forEach(user => realm.create('User', user));

      // Seed Categories
      const categories: Category[] = [
        { category_id: 1, name: 'Electronics', status: 1 },
        { category_id: 2, name: 'Books', status: 1 },
      ];
      categories.forEach(category => realm.create('Category', category));

      // Seed Products
      const products: Product[] = [
        {
          product_id: 1,
          name: 'Laptop',
          bar_code: '1234567890',
          color_code: 'silver',
          price: 999.99,
          price_offer: 899.99,
          cost: 700,
          stock: 50,
          category_id: 1,
          status: 1,
        },
        {
          product_id: 2,
          name: 'Smartphone',
          bar_code: '0987654321',
          color_code: 'black',
          price: 799.99,
          price_offer: 699.99,
          cost: 500,
          stock: 100,
          category_id: 1,
          status: 1,
        },
        {
          product_id: 3,
          name: 'Novel',
          bar_code: '1122334455',
          color_code: 'blue',
          price: 19.99,
          price_offer: 17.99,
          cost: 10,
          stock: 200,
          category_id: 2,
          status: 1,
        },
        {
          product_id: 4,
          name: 'Tablet',
          bar_code: '2233445566',
          color_code: 'gold',
          price: 499.99,
          price_offer: 449.99,
          cost: 300,
          stock: 70,
          category_id: 1,
          status: 1,
        },
        {
          product_id: 5,
          name: 'Headphones',
          bar_code: '3344556677',
          color_code: 'white',
          price: 149.99,
          price_offer: 129.99,
          cost: 100,
          stock: 150,
          category_id: 1,
          status: 1,
        },
        {
          product_id: 6,
          name: 'Keyboard',
          bar_code: '4455667788',
          color_code: 'black',
          price: 49.99,
          price_offer: 44.99,
          cost: 20,
          stock: 120,
          category_id: 1,
          status: 1,
        },
        {
          product_id: 7,
          name: 'Mouse',
          bar_code: '5566778899',
          color_code: 'red',
          price: 29.99,
          price_offer: 24.99,
          cost: 10,
          stock: 80,
          category_id: 1,
          status: 1,
        },
        {
          product_id: 8,
          name: 'Monitor',
          bar_code: '6677889900',
          color_code: 'black',
          price: 199.99,
          price_offer: 179.99,
          cost: 150,
          stock: 60,
          category_id: 1,
          status: 1,
        },
        {
          product_id: 9,
          name: 'Printer',
          bar_code: '7788990011',
          color_code: 'white',
          price: 99.99,
          price_offer: 89.99,
          cost: 70,
          stock: 90,
          category_id: 1,
          status: 1,
        },
        {
          product_id: 10,
          name: 'Router',
          bar_code: '8899001122',
          color_code: 'black',
          price: 79.99,
          price_offer: 69.99,
          cost: 40,
          stock: 110,
          category_id: 1,
          status: 1,
        },
      ];
      products.forEach(product => realm.create('Product', product));

      // Seed Customers
      const customers: Customer[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '098-765-4321',
        },
      ];
      customers.forEach(customer => realm.create('Customer', customer));

      // Seed Orders
      const orders: Order[] = [];
      for (let i = 1; i <= 20; i++) {
        orders.push({
          order_id: i,
          user_id: i % 2 === 0 ? 1 : 2,
          total_price: Math.floor(Math.random() * 1000) + 100,
          customer_id: i % 2 === 0 ? 1 : 2,
          status: i % 2 === 0 ? 'completed' : 'pending',
          date: new Date().toISOString(),
        });
      }
      orders.forEach(order => realm.create('Order', order));

      // Seed OrderItems
      const orderItems: OrderItem[] = [];
      for (let i = 1; i <= 20; i++) {
        orderItems.push({
          detail_id: i,
          order_id: Math.floor((i - 1) / 2) + 1,
          product_id: (i % 10) + 1,
          quantity: Math.floor(Math.random() * 5) + 1,
          price: Math.floor(Math.random() * 500) + 50,
          date: new Date().toISOString(),
        });
      }
      orderItems.forEach(orderItem => realm.create('OrderItem', orderItem));

      const stock: Stock[] = products.map(product => ({
        stock_id: product.product_id,
        product_id: product.product_id,
        stock: product.stock ?? 0, // Ensure stock is a number
      }));
      stock.forEach(stockItem => realm.create('Stock', stockItem));

      // Seed Payments
      const payments: Payment[] = [];
      for (let i = 1; i <= 20; i++) {
        payments.push({
          id: i,
          order_id: i,
          amount: Math.floor(Math.random() * 1000) + 100,
          payment_method: i % 2 === 0 ? 'credit_card' : 'paypal',
          date: new Date().toISOString(),
        });
      }
      payments.forEach(payment => realm.create('Payment', payment));

      console.log('Database seeded successfully');
    });
  } catch (error) {
    console.log('..................', error);
  }
};

export { seedData };
