/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker';

export const isValidColor = value =>
	/^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(value) 
export const isValidNumber = value =>
	typeof value === 'number' && isFinite(value)
export const isValidString = value =>
	typeof value === 'string' && value.trim().length > 0

const generateRandomData = () => {
  return {
    name: faker.company.name(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    user_name: faker.internet.userName(),
    email: faker.internet.email(),
    mobile: faker.phone.number().slice(0, 12),
    password: '1234567',
    address: faker.location.streetAddress(),
    role: 'admin',
    pass_code: 1234,
  };
};

const toWordCase = (str) => {
  return str.toLowerCase().replace(/(^|\s)\S/g, (t) => t.toUpperCase());
};

export { generateRandomData, toWordCase }