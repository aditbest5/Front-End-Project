import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Authentication = () => {
  const [message, setMessage] = useState("Loading...");
  const { token } = useParams();
  useEffect(() => {
    Axios.patch(
      `https://api-sosmed.project-adit.my.id/auth/verified`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        setMessage("Your account verified ✔");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  }, []);
  return (
    <div className='text-center mt-36'>
      <h1 className='font-bold'>{message}</h1>
    </div>
  );
};

export default Authentication;
