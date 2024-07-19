import {
  getDocument as getUser,
  updateUserData,
  updateUserDataOptions,
} from "@/Api/documents";
import { useAuth } from "@/context/auth";
import useSWR, { useSWRConfig } from "swr";
const useSettings = () => {
  const [auth, setAuth] = useAuth();

  const {
    data: userData,
    mutate: mutateUserData,
    // isLoading,
  } = useSWR("http://localhost:3851/api/v1/user/user-details", getUser, {
    onSuccess: (data) => {
      if (data) {
        const stringifyData = JSON.stringify(data);
        setAuth({
          ...auth,
          user: data,
        });
        localStorage.setItem("user", stringifyData);
      }
      return data;
    },
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const updateUser = async (data) => {
    try {
      mutateUserData(updateUserData(data), updateUserDataOptions(data));
    } catch (error) {
      console.log(error);
    }
  };

  return { userData, updateUser };
};

export default useSettings;
