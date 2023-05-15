import { Navigate } from "react-router-dom";
import swal from "sweetalert";
import { GlobalContext } from "../Context/GlobalContext";
import { useContext, useEffect } from "react";
const VerifiedRoute = (props) => {
  const { state, functionHandler } = useContext(GlobalContext);
  const { user } = state;
  const { fetchUser } = functionHandler;
  useEffect(() => fetchUser(), []);

  if (user.status === "unverified") {
    swal({
      icon: "info",
      title: "Verify Your Account!",
    });
    return <Navigate to='/profile' />;
  } else if (user.status !== "unverified") {
    return props.children;
  }
};

export default VerifiedRoute;
