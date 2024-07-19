import { useAuth } from "@/context/auth";
import { useEffect } from "react";

const useUpdateUser = (user) => {
  const [auth, setAuth] = useAuth({});

  useEffect(() => {
    setAuth({
      ...auth,
      user: user,
      accessToken: user.accessToken,
    });
  }, [user]);
};

export default useUpdateUser;
