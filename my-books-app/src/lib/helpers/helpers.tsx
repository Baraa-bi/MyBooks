import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../../config/constants";

const getApiToken = () => {
  return AsyncStorage.getItem(STORAGE_KEYS.API_TOKEN);
};

const storeApiToken = (token: any) => {
  return AsyncStorage.setItem(STORAGE_KEYS.API_TOKEN, token);
};

export const removeApiToken = () => {
  return AsyncStorage.removeItem(STORAGE_KEYS.API_TOKEN);
};

export { getApiToken, storeApiToken };
