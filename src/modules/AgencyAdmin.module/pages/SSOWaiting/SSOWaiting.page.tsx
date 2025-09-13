import ShimmerEffectPageLoader from "../../../../components/layouts/PageLoader/ShimmerEffectPageLoader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { Roles } from "../../../../constants/role.enums";
import toast from "react-hot-toast";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import axios from "axios";
import PageWrapper from "../../../../components/layouts/PageWrapper/PageWrapper";

const SSOWaitingPage = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const navigateTo = useNavigate();
  const [localToken, setLocalToken] = useLocalStorage<string | null>(
    "token",
    null,
  );
  const [localUser, setLocalUser] = useLocalStorage<string | null>(
    "user",
    null,
  );

  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");

  const handleSSOLogin = async () => {
    try {
      await setLocalToken(token);
      // const response = await axiosInstance.get("/user/me");

      const response = await axios.get(`${apiBaseUrl}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        if (response.data.data.role === Roles.CLIENT) {
          toast.error(
            "This user is register as client and cannot be used to login here",
          );
          navigateTo("/signin");
        } else {
          await setLocalUser(response.data.data);
          window.location.href = "/dashboard";
          // navigateTo("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    if (token) {
      handleSSOLogin();
    }
  }, [token]);
  return (
    <PageWrapper isProtectedRoute={false} title="SSO Login">
      <ShimmerEffectPageLoader />;
    </PageWrapper>
  );
};

export default SSOWaitingPage;
