import { Card, Button, TextInput } from "flowbite-react";
import { GlobalContext } from "../Context/GlobalContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import swal from "sweetalert";

export default function EditProfile() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const { state, functionHandler } = useContext(GlobalContext);
  const { user } = state;
  const { fetchUser } = functionHandler;
  useEffect(() => fetchUser(), []);
  console.log(file);
  const [input, setInput] = useState({
    username: user.username,
    fullname: user.fullname,
    biodata: user.biodata,
  });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const backButton = () => {
    navigate("/profile");
  };
  const onBtnAddFile = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
      let preview = document.getElementById("imgPreview");
      console.log(preview);
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };
  const onBtnAdd = (e) => {
    e.preventDefault();
    if (file) {
      let formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      Axios.post("http://localhost:2000/album/upload", formData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((res) => {
          swal({ title: res.data.message, icon: "success" });
        })
        .catch((err) => {
          if (err.reponse) {
            swal({
              icon: "warning",
              title: err.reponse.data.message,
            });
          }
        });
    }
  };
  const saveButton = (e) => {
    e.preventDefault();
    const { username, fullname, biodata } = input;
    Axios.patch(
      `http://localhost:2000/user/edit-user`,
      {
        username,
        fullname,
        biodata,
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
        setInput({ username: "", biodata: "", fullname: "" });
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
            <img
              id='imgPreview'
              class='inline-block h-40 w-40 rounded-full ring-2 ring-white'
            />
          </div>
          <div className='mt-2 flex flex-row justify-center'>
            <TextInput
              id='img'
              name='img'
              type='file'
              required={true}
              onChange={onBtnAddFile}
            />
          </div>
          <div className='mt-2 flex flex-row justify-center'>
            <Button onClick={onBtnAdd}>Save Photo Profile</Button>
          </div>
        </div>
        <div className='mt-10 pb-5 flex flex-row justify-center'>
          <Card className='w-9/12'>
            <div className='flex flex-col justify-around'>
              <div className='m-5'>
                <h1 className='font-extrabold'>Your Username:</h1>
                <TextInput
                  id='username'
                  type='text'
                  name='username'
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: "0px",
                    borderLeftWidth: "0px",
                    borderRightWidth: "0px",
                    borderBottom: "1px solid black",
                    borderRadius: "0px",
                  }}
                  size='50'
                  defaultValue={user.username}
                  onChange={inputHandler}
                  // value={name}
                  required={true}
                />
              </div>
              <div className='m-5'>
                <h1 className='font-extrabold'>Your Name:</h1>
                <TextInput
                  id='fullname'
                  type='text'
                  name='fullname'
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: "0px",
                    borderLeftWidth: "0px",
                    borderRightWidth: "0px",
                    borderBottom: "1px solid black",
                    borderRadius: "0px",
                  }}
                  size='50'
                  defaultValue={user.fullname}
                  onChange={inputHandler}
                  // value={name}
                  required={true}
                />
              </div>
              <div className='m-5'>
                <h1 className='font-extrabold'>Your Bio:</h1>
                <textarea
                  type='text'
                  defaultValue={user.biodata}
                  name='biodata'
                  onChange={inputHandler}
                  required
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></textarea>
              </div>
              <div className='m-5'>
                <h1 className='font-extrabold'>Your Email:</h1>
                <h1>{user.email}</h1>
              </div>
              <div className='flex flex-row'>
                <div className='m-5'>
                  <Button onClick={backButton}>Back</Button>
                </div>
                <div className='m-5'>
                  <Button onClick={saveButton}>Save Profile</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
