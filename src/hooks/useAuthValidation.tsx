import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useAuthentication from "./useAuthentication";
import { AuthStatusEnums } from "../enums/general";
import { getLoggedInUser } from "../services/auth.service";
import { LoggedInUserType } from "../interfaces/general";

const useAuthValidation = () => {
  const { setAuthStatus } = useAuthentication();

  useEffect(() => {
    async function authValidation() {
      try {
        const userData = await getLoggedInUser();

        if (!userData) {
          setAuthStatus(AuthStatusEnums.UNAUTH);
          return;
        }

        const currentTime = Date.now();
        const lastActive = (userData as LoggedInUserType).time;
        const timeDiff = (currentTime - lastActive) / (1000 * 60);

        if (timeDiff < 5) {
          setAuthStatus(AuthStatusEnums.AUTH);
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ ...userData, time: Date.now() }),
          );
        } else setAuthStatus(AuthStatusEnums.UNAUTH);
      } catch (error) {
        console.log(error);
      }
    }

    authValidation();
  }, []);
};

export default useAuthValidation;
