import { GlobalContext } from "../Context/GlobalContext";
import { useEffect, useContext } from "react";
import { Avatar, Card, Button } from "flowbite-react";
import Axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function ProfilePage() {
  const navigate = useNavigate();
  const { state, functionHandler } = useContext(GlobalContext);
  const { user } = state;
  const { fetchUser } = functionHandler;
  console.log(user);
  const sendVerification = () => {
    Axios.patch(
      `https://api-sosmed.project-adit.my.id/auth/send-verification`,
      {},
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    )
      .then((res) => {
        const { message } = res.data;
        swal({
          icon: "success",
          title: message,
        });
      })
      .catch((err) => alert("Terjadi Kesalahan Server"));
  };
  useEffect(() => fetchUser(), []);
  console.log(user);
  return (
    <>
      <div className='my-20 w-full'>
        <div className='flex flex-col justify-evenly'>
          <div className='flex flex-row justify-center'>
            <h1 className='font-extrabold font-serif text-gray-800 text-4xl text-center'>
              Profile
            </h1>
          </div>
          <div className='mt-5 flex flex-row justify-center'>
            <Avatar
              alt={user.username}
              img={
                user.profile_picture === null
                  ? ""
                  : "https://api-sosmed.project-adit.my.id" + user.profile_picture
              }
              rounded={true}
              bordered={true}
              size='xl'
            />
          </div>
        </div>
        <div className='mt-10 pb-5 flex flex-row justify-center'>
          <Card className='w-9/12'>
            <div className='flex flex-col justify-around'>
              <div className='m-5'>
                <h1 className='font-extrabold'>Your Username:</h1>
                <h1>{user.username}</h1>
              </div>
              <div className='m-5'>
                <h1 className='font-extrabold'>Your Name:</h1>
                <h1>{user.fullname}</h1>
              </div>
              <div className='m-5'>
                <h1 className='font-extrabold'>Your Bio:</h1>
                <h1>{user.biodata}</h1>
              </div>
              <div className='m-5'>
                <h1 className='font-extrabold'>Your Email:</h1>
                <h1>
                  {user.email}
                  {user.status !== "verified" ? (
                    <span
                      onClick={sendVerification}
                      className='mx-4 text-blue-600 cursor-pointer'>
                      Verify Your Email
                    </span>
                  ) : (
                    <span className='mx-4 italic'>Verified ✔</span>
                  )}
                </h1>
              </div>
              <div className='m-5'>
                <h1 className='font-extrabold'>Your Password:</h1>
                <h1>******************</h1>
              </div>
              <div className='flex flex-row'>
                <div className='m-5'>
                  <Button onClick={() => navigate("/edit-password")}>
                    Change Password
                  </Button>
                </div>
                <div className='m-5'>
                  <Button onClick={() => navigate("/edit-profile")}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
