import { Avatar, Card, Button, TextInput } from "flowbite-react";
import { GlobalContext } from "../Context/GlobalContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import swal from "sweetalert";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function ChangePassowrd() {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [icon2, setIcon2] = useState(eyeOff);
  const { state, functionHandler } = useContext(GlobalContext);
  const { user } = state;
  const { fetchUser } = functionHandler;
  useEffect(() => fetchUser(), []);
  const [input, setInput] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const iconToggle = (type, setType, setIcon) => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const backButton = () => {
    navigate("/profile");
  };
  console.log(input);
  const savePasswordButton = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword } = input;
    Axios.patch(
      `http://localhost:2000/user/edit-password`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((res) => {
        const { message } = res.data;
        swal({
          icon: "success",
          title: message,
        });
        setInput({ currentPassword: "", newPassword: "" });
        navigate("/profile");
      })
      .catch((err) => {
        if (err.response) {
          swal({
            icon: "warning",
            title: err.response.data.message,
          });
        } else {
          swal({
            icon: "warning",
            title: "Terjadi kesalahan jaringan!",
          });
        }
      });
  };
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
              img={"http://localhost:2000" + user.profile_picture}
              rounded={true}
              bordered={true}
              size='xl'
            />
          </div>
        </div>
        <div className='mt-10 pb-5 flex flex-row justify-center'>
          <Card className='w-6/12'>
            <div className='flex flex-col justify-around w-full lg:w-9/12'>
              <div className='m-5'>
                <h1 className='font-extrabold'>Current Password:</h1>
                <div className='flex flex-row'>
                  <TextInput
                    id='currentPassword'
                    type={type}
                    name='currentPassword'
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderTopWidth: "0px",
                      borderLeftWidth: "0px",
                      borderRightWidth: "0px",
                      borderBottom: "1px solid black",
                      borderRadius: "0px",
                    }}
                    size='60'
                    onChange={inputHandler}
                    // value={name}
                    required={true}
                  />
                  <span className='m-1'>
                    <Icon
                      icon={icon}
                      onClick={() => iconToggle(type, setType, setIcon)}
                    />
                  </span>
                </div>
              </div>
              <div className='m-5'>
                <h1 className='font-extrabold'>New Password:</h1>
                <div className='flex flex-row'>
                  <TextInput
                    id='newPassword'
                    type={type2}
                    name='newPassword'
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderTopWidth: "0px",
                      borderLeftWidth: "0px",
                      borderRightWidth: "0px",
                      borderBottom: "1px solid black",
                      borderRadius: "0px",
                    }}
                    size='60'
                    onChange={inputHandler}
                    // value={name}
                    required={true}
                  />
                  <span className='m-1'>
                    <Icon
                      icon={icon2}
                      onClick={() => iconToggle(type2, setType2, setIcon2)}
                    />
                  </span>
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='m-2'>
                  <Button onClick={backButton}>Back</Button>
                </div>
                <div className='m-2'>
                  <Button onClick={savePasswordButton}>Change Password</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
