import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { GlobalContext } from "../Context/GlobalContext";
import { useContext, useEffect } from "react";

export default function MyNavbar() {
  const { state } = useContext(GlobalContext);
  const { user } = state;
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
    swal({
      icon: "success",
      title: "Berhasil Logout",
    });
  };
  return (
    <>
      <Navbar className='bg-violet-500' fluid={true} rounded={true}>
        <Navbar.Brand>
          <img
            src='https://flowbite.com/docs/images/logo.svg'
            className='mr-3 h-6 sm:h-9'
            alt='Flowbite Logo'
          />
          <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white text-transparent bg-gradient-to-r bg-clip-text from-red-700 to-blue-900'>
            Indogram
          </span>
        </Navbar.Brand>
        <div className='flex md:order-2'>
          {localStorage.getItem("token") ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt='User settings'
                    img={
                      user.profile_picture === null
                        ? ""
                        : "https://api-sosmed.project-adit.my.id" + user.profile_picture
                    }
                    rounded={true}
                  />
                }>
                <Dropdown.Header>
                  <span className='block text-sm'>{user.username}</span>
                  <span className='block truncate text-sm font-medium'>
                    {user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link to='/profile'>Profile</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <>
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt='User settings'
                    img={user.images}
                    rounded={true}
                  />
                }>
                <Dropdown.Header>
                  <span className='block text-sm'>Welcome to Indogram</span>
                  <span className='block truncate text-sm font-medium'>
                    Please Login Or Register
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link to='/'>Login</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Link to='/register'>Register</Link>
                </Dropdown.Item>
              </Dropdown>
            </>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {localStorage.getItem("token") ? (
            <>
              <Navbar.Link active={true}>
                <Link to='/home'>Home</Link>
              </Navbar.Link>
              <Navbar.Link>
                <Link to='/profile'>Profile</Link>
              </Navbar.Link>
              <Navbar.Link>Services</Navbar.Link>
              <Navbar.Link>Terms & Condition</Navbar.Link>
            </>
          ) : (
            <>
              <Navbar.Link active={true}>
                <Link to='/'>Login</Link>
              </Navbar.Link>
              <Navbar.Link>
                <Link to='/register'>Register</Link>
              </Navbar.Link>
              <Navbar.Link>Services</Navbar.Link>
              <Navbar.Link>Terms & Condition</Navbar.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
