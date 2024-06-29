/* eslint-disable prettier/prettier */
import {getRealmInstance} from './store';

export interface User {
    user_id: number;
    username: string;
    password: string;
    role: string;
}

const insertUser = async (
    username: string,
    password: string,
    role: string,
): Promise<User> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
          realm.write(() => {
            const user = realm.create('User', {
              user_id: Math.floor(Math.random() * 1000000), // Replace with a proper id generator
              username,
              password,
              role,
            });
            resolve(user);
          });
        } catch (error) {
          reject(error);
        } 
    });
};

const updateUser = async (
    user_id: number,
    username: string,
    password: string,
    role: string,
): Promise<User> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                const user = realm.objectForPrimaryKey<User>('User', user_id);
                if (user) {
                    user.username = username;
                    user.password = password;
                    user.role = role;
                    resolve(user);
                } else {
                    reject(new Error('User not found'));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteUser = async (user_id: number): Promise<boolean> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                const user = realm.objectForPrimaryKey('User', user_id);
                if (user) {
                    realm.delete(user);
                    resolve(true);
                } else {
                    reject(new Error('User not found'));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

const queryUsers = async (): Promise<User[]> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            const users = realm.objects<User>('User').map(user => ({
                user_id: user.user_id,
                username: user.username,
                password: user.password,
                role: user.role,
            }));
            resolve(users);
        } catch (error) {
            reject(error);
        } 
    });
};

const loginUser = async (username: string, password: string): Promise<User> => {
    const realm = await getRealmInstance();
    return new Promise((resolve, reject) => {
        try {
            const user = realm
                .objects<User>('User')
                .filtered('username == $0 AND password == $1', username, password)[0];
            if (user) {
                resolve(user);
            } else {
                reject(new Error('Invalid username or password'));
            }
        } catch (error) {
            reject(error);
        }
    });
};

export { insertUser, updateUser, deleteUser, queryUsers, loginUser };
