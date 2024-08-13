import { Card, TextInput, Label, Button } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import Axios from "axios";
import swal from "sweetalert";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState(loadingPage);
  const [type, setType] = useState("password");
  const [type2, setType2] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [icon2, setIcon2] = useState(eyeOff);
  console.log(icon, icon2, type, type2);
  const iconToggle = (type, setType, setIcon) => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const { token } = useParams();
  function loadingPage() {
    return (
      <>
        <div className='flex flex-row justify-center mt-36'>
          <h1 className='font-bold'>Loading...</h1>
        </div>
      </>
    );
  }
  const expiredToken = (message) => {
    return (
      <>
        <div className='flex flex-row justify-center mt-36'>
          <h1 className='font-bold'>{message}</h1>
        </div>
      </>
    );
  };
  useEffect(() => {
    Axios.get(`https://api-sosmed.project-adit.my.id/user/reset-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setMessage(true);
      })
      .catch((err) => {
        setMessage(expiredToken(err.response.data.message));
      });
  }, []);

  const [input, setInput] = useState({
    email: "",
  });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const resetHandler = (e) => {
    e.preventDefault();
    setDisable(true);
    const { newPassword, confirmPassword } = input;
    Axios.patch(
      `https://api-sosmed.project-adit.my.id/user/reset-password`,
      {
        newPassword,
        confirmPassword,
      },
      { headers: { Authorization: "Bearer " + token } }
    )
      .then((res) => {
        let { message } = res.data;
        swal({
          title: message,
          icon: "success",
        });
        navigate("/");
        setDisable(false);
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
        setDisable(false);
      });
  };
  if (message === true) {
    return (
      <>
        <div className='flex flex-col justify-between m-16'>
          <div className='flex flex-row justify-center mb-4'>
            <h1 className='font-serif font-extrabold text-xl text-transparent bg-gradient-to-r bg-clip-text from-yellow-500 to-green-900'>
              Reset Password
            </h1>
          </div>
          <div className='flex flex-row justify-center'>
            <Card className='lg:w-5/12 w-11/12 bg-indigo-300 shadow-lg shadow-indigo-500/40'>
              <form onSubmit={resetHandler} className='flex flex-col gap-4'>
                <div>
                  <div className='mb-2 flex flex-row justify-center'>
                    <Label
                      className='text-red-500'
                      htmlFor='newPassword'
                      value='New Password:'
                    />
                  </div>
                  <div className='flex flex-row justify-center'>
                    <TextInput
                      id='newPassword'
                      type={type}
                      name='newPassword'
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderTopWidth: "0px",
                        borderLeftWidth: "0px",
                        borderRightWidth: "0px",
                        borderBottom: "1px solid black",
                        borderRadius: "0px",
                      }}
                      size='50'
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
                <div>
                  <div className='mb-2 flex flex-row justify-center'>
                    <Label
                      className='text-red-500'
                      htmlFor='confirmPassword'
                      value='Confirm New Password:'
                    />
                  </div>
                  <div className='flex flex-row justify-center'>
                    <TextInput
                      id='confirmPassword'
                      type={type2}
                      name='confirmPassword'
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderTopWidth: "0px",
                        borderLeftWidth: "0px",
                        borderRightWidth: "0px",
                        borderBottom: "1px solid black",
                        borderRadius: "0px",
                      }}
                      size='50'
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
                <div className='flex flex-row justify-center'>
                  <div className='mr-4 my-3'>
                    <Button disabled={disable} className='w-full' type='submit'>
                      Reset
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </>
    );
  } else {
    return message;
  }
}
