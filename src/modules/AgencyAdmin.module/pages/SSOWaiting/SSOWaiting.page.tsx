import ShimmerEffectPageLoader from "../../../../components/layouts/PageLoader/ShimmerEffectPageLoader";
import PageWrapper from "../../../../components/layouts/PageWrapper/PageWrapper";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { Roles } from "../../../../constants/role.enums";
import toast from "react-hot-toast";

const SSOWaitingPage = () => {
  const navigateTo = useNavigate();
  const [searchParam] = useSearchParams();
  const token = searchParam.get("token");

  const handleSSOLogin = async () => {
    try {
      await localStorage.setItem("token", JSON.stringify(token));
      const response = await axiosInstance.get("user/me");

      if (response.data.success) {
        if (response.data.data.role === Roles.CLIENT) {
          toast.error(
            "This user is register as client and cannot be used to login here",
          );
          navigateTo("/signin");
        } else {
          await localStorage.setItem(
            "user",
            JSON.stringify(response.data.data),
          );
          navigateTo("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      handleSSOLogin();
    }
  }, [token]);
  return (
    <PageWrapper isProtectedRoute={false} name="SSOWaiting">
      <ShimmerEffectPageLoader />
    </PageWrapper>
  );
};

export default SSOWaitingPage;
