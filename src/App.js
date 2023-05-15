import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import Layout from "./Layout/Layout";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/Profile";
import AccessRoute from "./Routes/AccessRoute";
import LoginRoute from "./Routes/LoginRoute";
import Authentication from "./Pages/Auth";
import VerifiedRoute from "./Routes/VerifiedRoute";
import Home from "./Pages/Home";
import EditProfile from "./Pages/EditProfilePage";
import ChangePassowrd from "./Pages/ChangePassword";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/register'
          element={
            <LoginRoute>
              <Layout>
                <RegisterPage />
              </Layout>
            </LoginRoute>
          }
        />
        <Route
          path='/'
          element={
            <LoginRoute>
              <Layout>
                <LoginPage />
              </Layout>
            </LoginRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <LoginRoute>
              <Layout>
                <ForgotPassword />
              </Layout>
            </LoginRoute>
          }
        />
        <Route
          path='/authentication/:token'
          element={
            <Layout>
              <Authentication />
            </Layout>
          }
        />
        <Route
          path='/reset-password/:token'
          element={
            <Layout>
              <ResetPassword />
            </Layout>
          }
        />
        <Route
          path='/profile'
          element={
            <AccessRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </AccessRoute>
          }
        />
        <Route
          path='/edit-profile'
          element={
            <AccessRoute>
              <Layout>
                <EditProfile />
              </Layout>
            </AccessRoute>
          }
        />
        <Route
          path='/edit-password'
          element={
            <AccessRoute>
              <Layout>
                <ChangePassowrd />
              </Layout>
            </AccessRoute>
          }
        />
        <Route
          path='/home'
          element={
            <AccessRoute>
              <VerifiedRoute>
                <Layout>
                  <Home />
                </Layout>
              </VerifiedRoute>
            </AccessRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
