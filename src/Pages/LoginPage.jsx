import { useState } from "react";
import Axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { Card, Label, TextInput, Button, Spinner } from "flowbite-react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function LoginPage() {
  const navigate = useNavigate();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    emailUsername: "",
    password: "",
  });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const iconToggle = (type, setType, setIcon) => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const loginHandler = (e) => {
    e.preventDefault();
    setDisable(true);
    setLoading(true);
    let { emailUsername, password } = input;
    Axios.post(`http://localhost:2000/auth/login`, {
      emailUsername,
      password,
    })
      .then((res) => {
        const { token, message } = res.data;
        swal({
          icon: "success",
          title: message,
        });
        setInput({
          email: "",
          password: "",
        });
        localStorage.setItem("token", token);
        navigate("/home");
        setDisable(false);
        setLoading(false);
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
        setLoading(false);
      });
  };
  return (
    <>
      <div className='flex flex-col justify-between m-16'>
        <div className='flex flex-row justify-center mb-4'>
          <h1 className='font-serif font-extrabold text-xl text-transparent bg-gradient-to-r bg-clip-text from-yellow-500 to-green-900'>
            Login Now!
          </h1>
        </div>

        <div className='flex flex-row justify-center'>
          <Card className='lg:w-5/12 w-11/12 bg-indigo-300 shadow-lg shadow-indigo-500/40'>
            <form onSubmit={loginHandler} className='flex flex-col gap-4'>
              <div>
                <div className='mb-2 flex flex-row justify-center'>
                  <Label
                    className='text-red-500'
                    htmlFor='emailUsername'
                    value='Email or Username'
                  />
                </div>
                <div className='flex flex-row justify-center'>
                  <TextInput
                    id='emailUsername'
                    type='text'
                    name='emailUsername'
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderTopWidth: "0px",
                      borderLeftWidth: "0px",
                      borderRightWidth: "0px",
                      borderBottom: "1px solid black",
                      borderRadius: "0px",
                    }}
                    size='50'
                    placeholder='name@gmail.com'
                    onChange={inputHandler}
                    // value={name}
                    required={true}
                  />
                </div>
              </div>
              <div>
                <div>
                  <div className='mb-2 flex flex-row justify-center'>
                    <Label
                      className='text-red-500'
                      htmlFor='password'
                      value='Password'
                    />
                  </div>
                  <div className='flex flex-row justify-center'>
                    <TextInput
                      id='password'
                      type={type}
                      name='password'
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
              </div>
              <div className='flex flex-row justify-between'>
                <div className='mr-4 my-3'>
                  <Button disabled={disable} className='w-24' type='submit'>
                    Login
                  </Button>
                </div>
                <div className='flex flex-row justify-start'>
                  <div className='mr-8 mt-4'>
                    {loading ? (
                      <>
                        <Spinner aria-label='Default status example' />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className='ml-4 flex flex-col'>
                  <Link className='mb-4' to='/register'>
                    <h1 className='text-sky-500	'>
                      Don't Have Account? Register here
                    </h1>
                  </Link>
                  <Link
                    className='flex flex-row justify-end'
                    to='/forgot-password'>
                    <h1 className='text-sky-500	'>Forgot Password?</h1>
                  </Link>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
