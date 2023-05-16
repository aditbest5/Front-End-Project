import { useState } from "react";
import Axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { Card, Label, TextInput, Button, Spinner } from "flowbite-react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [icon1, setIcon1] = useState(eyeOff);
  const [disable, setDisable] = useState(false);
  const [icon2, setIcon2] = useState(eyeOff);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
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
  const registerHandler = (e) => {
    e.preventDefault();
    setDisable(true);
    setLoading(true);
    let { username, email, password, confirmPassword } = input;
    Axios.post(`http://localhost:2000/auth/register`, {
      email,
      username,
      password,
      confirmPassword,
    })
      .then((res) => {
        const { message } = res.data;
        swal({
          icon: "success",
          title: message,
        });
        setInput({
          name: "",
          password: "",
          email: "",
          confirmPassword: "",
        });
        setDisable(false);
        setLoading(false);
        navigate("/");
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
      <div className='flex flex-col justify-between m-20'>
        <div className='flex flex-row justify-center mx-24 mb-4'>
          <h1 className='font-serif font-extrabold text-xl text-transparent bg-gradient-to-r bg-clip-text from-yellow-500 to-green-900'>
            Register Now!
          </h1>
        </div>

        <div className='flex flex-row justify-center'>
          <Card className='lg:w-9/12 w-full bg-indigo-300 shadow-lg shadow-indigo-500/40'>
            <form onSubmit={registerHandler} className='flex flex-col gap-4'>
              <div className='flex flex-row justify-between'>
                <div className='mr-3'>
                  <div className='mb-2 block'>
                    <Label
                      className='text-red-500'
                      htmlFor='email'
                      value='Email'
                    />
                  </div>
                  <TextInput
                    id='email'
                    type='email'
                    name='email'
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
                <div>
                  <div className='mb-2 block'>
                    <Label
                      className='text-red-500'
                      htmlFor='username'
                      value='Username'
                    />
                  </div>
                  <TextInput
                    id='username'
                    type='text'
                    name='username'
                    size='50'
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderTopWidth: "0px",
                      borderLeftWidth: "0px",
                      borderRightWidth: "0px",
                      borderBottom: "1px solid black",
                      borderRadius: "0px",
                    }}
                    onChange={inputHandler}
                    // value={name}
                    required={true}
                  />
                </div>
              </div>
              <div>
                <div className='flex flex-row justify-between'>
                  <div>
                    <div className='mb-2'>
                      <Label
                        className='text-red-500'
                        htmlFor='password'
                        value='Password'
                      />
                    </div>
                    <div className='flex flex-row justify-between'>
                      <TextInput
                        id='password'
                        type={type1}
                        name='password'
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderTopWidth: "0px",
                          borderLeftWidth: "0px",
                          borderRightWidth: "0px",
                          borderBottom: "1px solid black",
                          borderRadius: "0px",
                        }}
                        size='45'
                        onChange={inputHandler}
                        // value={height}
                        required={true}
                      />
                      <span className='m-2'>
                        <Icon
                          icon={icon1}
                          onClick={() => iconToggle(type1, setType1, setIcon1)}
                        />
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className='mb-2'>
                      <Label
                        className='text-red-500'
                        htmlFor='confirmPassword'
                        value='Confirm Password'
                      />
                    </div>
                    <div className='flex flex-row'>
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
                        size='45'
                        onChange={inputHandler}
                        // value={height}
                        required={true}
                      />
                      <span className='m-2'>
                        <Icon
                          icon={icon2}
                          onClick={() => iconToggle(type2, setType2, setIcon2)}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <div className='mr-5'>
                  <Button disabled={disable} className='w-24' type='submit'>
                    Register
                  </Button>
                </div>

                <div className='ml-4'>
                  <Link to='/'>
                    <h1 className='text-sky-500	'>
                      Already Have Account? Sign in!
                    </h1>
                  </Link>
                </div>
              </div>
              <div className='flex flex-row justify-start'>
                <div className='ml-8'>
                  {loading ? (
                    <>
                      <Spinner aria-label='Default status example' />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
