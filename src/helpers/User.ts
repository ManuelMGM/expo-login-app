import AsyncStorage from "@react-native-community/async-storage";
import { ServerUser } from "./mockedUsers";

const user_key = "user";

// User Class
class User {
  async set(user: ServerUser) {
    try {
      await AsyncStorage.setItem(user_key, JSON.stringify(user));

      return this.get();
    } catch (e) {
      return false;
    }
  }

  async get(): Promise<ServerUser> {
    try {
      let user = await AsyncStorage.getItem(user_key);

      if (!!user) {
        return JSON.parse(user);
      }
    } catch (e) {}

    return null;
  }

  async remove() {
    await AsyncStorage.removeItem(user_key);

    return;
  }
}

export default new User();
