import { Card, TextInput, Label, Button } from "flowbite-react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
export default function ForgotPassword() {
  const [disable, setDisable] = useState(false);

  const [input, setInput] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const forgotHandler = (e) => {
    e.preventDefault();
    setDisable(true);
    const { email } = input;
    Axios.post(`https://api-sosmed.project-adit.my.id/user/send-forgot-password`, {
      email,
    })
      .then((res) => {
        let { message } = res.data;
        swal({
          icon: "success",
          title: message,
        });
        setInput({
          email: "",
        });
        setDisable(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
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
  return (
    <>
      <div className='flex flex-col justify-between m-16'>
        <div className='flex flex-row justify-center mb-4'>
          <h1 className='font-serif font-extrabold text-xl text-transparent bg-gradient-to-r bg-clip-text from-yellow-500 to-green-900'>
            Forgot Password
          </h1>
        </div>

        <div className='flex flex-row justify-center'>
          <Card className='lg:w-5/12 w-11/12 bg-indigo-300 shadow-lg shadow-indigo-500/40'>
            <form onSubmit={forgotHandler} className='flex flex-col gap-4'>
              <div>
                <div className='mb-2 flex flex-row justify-center'>
                  <Label
                    className='text-red-500'
                    htmlFor='email'
                    value='Email '
                  />
                </div>
                <div className='flex flex-row justify-center'>
                  <TextInput
                    id='email'
                    type='text'
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
                    defaultValue={input.email}
                    placeholder='Input Registered Email'
                    onChange={inputHandler}
                    // value={name}
                    required={true}
                  />
                </div>
              </div>
              <div className='flex flex-row justify-center'>
                <div className='mr-4 my-3'>
                  <Button disabled={disable} className='w-full' type='submit'>
                    Send Link
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
