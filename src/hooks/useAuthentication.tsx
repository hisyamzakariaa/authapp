import { useContext } from "react";

import { AuthContext } from "../store/useAuthContext";

const useAuthentication = () => {
  return useContext(AuthContext);
};

export default useAuthentication;
