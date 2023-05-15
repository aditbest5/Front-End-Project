import { Navigate } from "react-router-dom";

import swal from "sweetalert";
const AccessRoute = (props) => {
  if (localStorage.getItem("token") === null) {
    swal({
      icon: "info",
      title: "You Must Login!",
    });
    return <Navigate to='/' />;
  } else if (localStorage.getItem("token") !== null) {
    return props.children;
  }
};

export default AccessRoute;
