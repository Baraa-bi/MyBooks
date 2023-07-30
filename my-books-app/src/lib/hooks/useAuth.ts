import { useAppContextActions } from "../contexts/AppContext";
import { getApiToken, removeApiToken, storeApiToken } from "../helpers/helpers";

export default function useAuth() {
  const { setApiToken } = useAppContextActions();

  const signOut = () => {
    setApiToken(null);
    removeApiToken();
  };

  const updateApiToken = (token: string | null) => {
    setApiToken(token);
    storeApiToken(token);
  };

  return { getApiToken, signOut, updateApiToken };
}
