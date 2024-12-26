import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Navigation from "./pages/navigation/Navigation";
import Profile from "./pages/profile/Profile";
import Homepage from "./pages/home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from './components/createPostModal/CreatePostModal'
import { useState } from "react";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </AuthProvider>
  );
}

function Main() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signUp" || location.pathname === "/";
  const [createPost, setCreatePost] = useState(false)

  const handleSetCreatePost = (value) => {
    setCreatePost(value)
  }

  return (
    <div className={`app-container ${isAuthPage ? "auth-page" : ""}`}>
      {createPost && <CreatePost isVisible={createPost} handleSetCreatePost={handleSetCreatePost}/>}
      {!isAuthPage && <Navigation handleSetCreatePost={handleSetCreatePost} />}
      <div className={`content ${isAuthPage ? "full-width" : ""}`}>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route
            path="homepage"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:username"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
