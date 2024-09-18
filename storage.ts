// storage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Friend {
  username: string;
  balance: number;
}

export interface Expense {
  title: string;
  amount: number;
  friends: string[];
}

export interface AppData {
  friends: Friend[];
  expenses: Expense[];
}

const DATA_KEY = '@app_data';

export const loadData = async (): Promise<AppData> => {
  try {
    const jsonValue = await AsyncStorage.getItem(DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : { friends: [], expenses: [] };
  } catch (error) {
    console.error('Failed to load data:', error);
    return { friends: [], expenses: [] }; 
  }
};

export const saveData = async (data: AppData) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(DATA_KEY, jsonValue);
  } catch (error) {
    console.error('Failed to save data:', error);
  }
};
