import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import Navigation from "./pages/navigation/Navigation";
import Profile from "./pages/profile/Profile";
import Homepage from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signUp" || location.pathname === "/";

  return (
    <div className={`app-container ${isAuthPage ? "auth-page" : ""}`}>
      {!isAuthPage && <Navigation />}
      <div className={`content ${isAuthPage ? "full-width" : ""}`}>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="explore" element={<Homepage />} />
          <Route path="messages" element={<Homepage />} />
          <Route path="profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
