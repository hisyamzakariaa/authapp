import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoggedInUserType, UserType } from "../interfaces/general";

export async function getUserData() {
  const users = await AsyncStorage.getItem("users");

  if (!users) await AsyncStorage.setItem("users", JSON.stringify([]));

  const usersData: UserType[] = users ? JSON.parse(users) : [];

  return usersData;
}

export async function getLoggedInUser() {
  const user = await AsyncStorage.getItem("user");
  if (!user) await AsyncStorage.setItem("user", JSON.stringify(null));

  const userData: LoggedInUserType | null = user ? JSON.parse(user) : null;

  return userData;
}
