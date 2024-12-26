import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SearchNavigation from "./searchNavigation/SearchNavigation";
import NotificationNavigation from "./notificationNavigation/NotificationNavigation";
import { useContext } from "react";

function HomeNavigation({ handleIconClick, handleSignOut, handleSetCreatePost }) {
  const { user } = useContext(AuthContext)
  return (
    <ul>
      <li>Homepage</li>
      <Link to="/explore"><li>Explore</li></Link>
      <li onClick={() => handleIconClick(<SearchNavigation />)}>Search</li>
      <Link to="/messages"><li>Messages</li></Link>
      <li onClick={() => handleIconClick(<NotificationNavigation />)}>Notifications</li>
      <li onClick={() => handleSetCreatePost(true)}>Create Post</li>
      <Link to={`profile/${user?.username}`}><li>Profile</li></Link>
      <Link to="/settings"><li>Settings</li></Link>
      <li onClick={() => handleSignOut()}>Log Out</li>
    </ul>
  );
}

export default HomeNavigation;
