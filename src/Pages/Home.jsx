import {
  Label,
  FileInput,
  Button,
  Card,
  Textarea,
  Dropdown,
} from "flowbite-react";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import Axios from "axios";
import swal from "sweetalert";
export default function Home() {
  const [editId, setEdit] = useState(0);
  const { state, functionHandler } = useContext(GlobalContext);
  const { user } = state;
  const [commentId, setComment] = useState(0);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");
  const [posting, setPosting] = useState([]);
  const [commenting, setCommenting] = useState([]);
  const [input, setInput] = useState({ caption: "", comment_text: "" });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  console.log(commenting);
  const fetchPosting = () => {
    Axios.get(`https://api-sosmed.project-adit.my.id/post/get-post`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        const { content } = res.data;
        setPosting(content);
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
  const fetchComment = () => {
    Axios.get("https://api-sosmed.project-adit.my.id/comment/get-comment", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        const { comment } = res.data;
        setCommenting(comment);
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
  useEffect(() => {
    fetchPosting();
    fetchComment();
  }, []);
  const onBtnAddFile = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
      let preview = document.getElementById("imgPreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };
  const postHandler = (e) => {
    e.preventDefault();
    if (file) {
      let formData = new FormData();
      let obj = { caption: input.caption };
      formData.append("data", JSON.stringify(obj));
      formData.append("file", file);
      Axios.post("https://api-sosmed.project-adit.my.id/post/post", formData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
        .then((res) => {
          swal({ title: res.data.message, icon: "success" });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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
    }
  };
  const deletePost = (idPost) => {
    Axios.delete(`https://api-sosmed.project-adit.my.id/post/delete-post/${idPost}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((res) => {
        swal({ title: res.data.message, icon: "success" });
        fetchPosting();
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
  const editToggle = (id) => {
    setEdit(id);
  };
  const cancelButton = () => {
    setEdit(0);
    setComment(0);
  };
  const saveButton = (id) => {
    const { caption } = input;
    Axios.patch(
      `https://api-sosmed.project-adit.my.id/post/update-post/${id}`,
      { caption },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((res) => {
        swal({ title: res.data.message, icon: "success" });
        fetchPosting();
        setInput({ caption: "" });
        setEdit(0);
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
  const postComment = (id) => {
    const { comment_text } = input;
    Axios.post(
      `https://api-sosmed.project-adit.my.id/comment/post/${id}`,
      { comment_text },
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
      .then((res) => {
        swal({ title: res.data.message, icon: "success" });
        fetchPosting();
        setInput({ comment_text: "" });
        setComment(0);
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
  const renderPost = () => {
    return posting.map((val) => {
      if (val.userId === user.id) {
        return (
          <>
            <div className='w-full bg-green-200	'>
              <div className='flex flex-row justify-center'>
                <Card className='w-9/12 h-4/6 mt-6 bg-amber-200	'>
                  {editId === val.id ? (
                    <>
                      <img
                        className='max-w-lg max-h-80'
                        src={"https://api-sosmed.project-adit.my.id" + val.media}
                      />
                      <div className='flex flex-row justify-start'>
                        <FaHeart size={20} className='mr-5' />{" "}
                        <FaComment size={20} className='mr-5' />
                        <FaShare size={20} />
                      </div>
                      <div className='font-xs text-teal-400'>
                        Diposting pada {val.createdAt.split("T")[0]}
                      </div>
                      <hr className='border-blue-400' />
                      <p className='font-normal text-gray-700 dark:text-gray-400'>
                        <Textarea
                          id='caption'
                          name='caption'
                          placeholder='Write your mind here...'
                          required={true}
                          onChange={inputHandler}
                          rows={4}
                        />
                      </p>
                      <div className='flex flex-row justify-normal'>
                        <Button onClick={cancelButton} className='mr-4'>
                          Cancel
                        </Button>
                        <Button onClick={() => saveButton(val.id)}>Save</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='flex flex-row justify-between'>
                        <img
                          className='max-w-lg max-h-80'
                          src={"https://api-sosmed.project-adit.my.id" + val.media}
                        />
                        <Dropdown
                          label='.
                    .
                    .'
                          placement='left-start'
                          inline={true}
                          className='bg-slate-200'>
                          <Dropdown.Item onClick={() => editToggle(val.id)}>
                            Edit Content
                          </Dropdown.Item>
                          <hr className='border-slate-800' />
                          <Dropdown.Item onClick={() => deletePost(val.id)}>
                            Delete Content
                          </Dropdown.Item>
                        </Dropdown>
                      </div>

                      <div className='flex flex-row justify-start'>
                        <FaHeart size={20} className='mr-5' />{" "}
                        <FaComment
                          onClick={() => setComment(val.id)}
                          size={20}
                          className='mr-5'
                        />
                        <FaShare size={20} />
                      </div>
                      <div className='font-xs text-teal-400'>
                        Diposting pada {val.createdAt.split("T")[0]}
                      </div>

                      <hr className='border-blue-400' />
                      <p className='font-normal text-gray-700 dark:text-gray-400'>
                        {val.caption}
                      </p>
                      <h1 className='font-bold italic text-gray-500'>
                        Komentar:
                      </h1>
                      <br />
                      {commenting.map((item) => {
                        if (item.postId === val.id) {
                          return (
                            <>
                              <div className='flex flex-col justify-around'>
                                <div className='flex flex-row justify-between'>
                                  {item.comment_text}
                                  <span>{item.createdAt.split("T")[0]}</span>
                                </div>
                              </div>
                              <hr className='border-slate-500' />
                            </>
                          );
                        } else {
                          return <></>;
                        }
                      })}
                      {commentId === val.id ? (
                        <>
                          <hr />
                          <Textarea
                            id='comment_text'
                            name='comment_text'
                            placeholder='Write your Comment...'
                            required={true}
                            onChange={inputHandler}
                            rows={4}
                          />
                          <div className='flex flex-row'>
                            <Button onClick={cancelButton} className='mr-4'>
                              Cancel
                            </Button>
                            <Button onClick={() => postComment(val.id)}>
                              Post Comment
                            </Button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </Card>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className='w-full bg-green-200	'>
              <div className='flex flex-row justify-center'>
                <Card className='w-9/12 my-6 bg-amber-200	'>
                  <img
                    className='max-w-lg max-h-80'
                    src={"https://api-sosmed.project-adit.my.id" + val.media}
                  />
                  <div className='flex flex-row justify-start'>
                    <FaHeart size={20} className='mr-5' />{" "}
                    <FaComment
                      onClick={() => setComment(val.id)}
                      size={20}
                      className='mr-5'
                    />
                    <FaShare size={20} />
                  </div>
                  <div className='font-xs text-teal-400	'>
                    Diposting pada {val.createdAt.split("T")[0]}
                  </div>
                  <hr className='border-blue-400' />
                  <p className='font-normal text-gray-700 dark:text-gray-400'>
                    {val.caption}
                  </p>
                  <h1 className='font-bold italic text-gray-500'>Komentar:</h1>
                  <br />
                  {commenting.map((item) => {
                    if (item.postId === val.id) {
                      return (
                        <>
                          <div className='flex flex-col justify-around'>
                            <div className='flex flex-row justify-between'>
                              {item.comment_text}
                              <span>{item.createdAt.split("T")[0]}</span>
                            </div>

                            <hr className='border-slate-500' />
                          </div>
                        </>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                  {commentId === val.id ? (
                    <>
                      <hr />
                      <Textarea
                        id='comment_text'
                        name='comment_text'
                        placeholder='Write your Comment...'
                        required={true}
                        onChange={inputHandler}
                        rows={4}
                      />
                      <div className='flex flex-row'>
                        <Button onClick={cancelButton} className='mr-4'>
                          Cancel
                        </Button>
                        <Button onClick={() => postComment(val.id)}>
                          Post Comment
                        </Button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </Card>
              </div>
            </div>
          </>
        );
      }
    });
  };

  return (
    <>
      <div className='w-full flex flex-col justify-evenly'>
        <div className='w-full flex flex-row justify-center'>
          <Card className='w-9/12 my-12'>
            <h1 className='font-bold italic font-serif'>What's On Today?</h1>
            <form onSubmit={postHandler} className='flex flex-col gap-4'>
              <div className='flex flex-row justify-start'>
                <img
                  id='imgPreview'
                  class='max-w-xs max-h-80 ring-2 ring-white'
                />
              </div>
              <div id='fileUpload'>
                <div className='mb-2'>
                  <Label htmlFor='file' value='Upload file' />
                </div>
                <FileInput
                  id='file'
                  onChange={onBtnAddFile}
                  helperText='A profile picture is useful to confirm your are logged into your account'
                />
              </div>
              <div>
                <div className='mb-2'>
                  <Label htmlFor='caption' value='Caption' />
                </div>
                <Textarea
                  id='caption'
                  name='caption'
                  placeholder='Write your mind here...'
                  required={true}
                  onChange={inputHandler}
                  rows={4}
                />
              </div>
              <Button className='w-3/12' type='submit'>
                Post
              </Button>
            </form>
          </Card>
        </div>
        <div>{renderPost()}</div>
      </div>
    </>
  );
}
