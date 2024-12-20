import { Link } from "react-router-dom";
import SearchNavigation from "./searchNavigation/SearchNavigation";
import NotificationNavigation from "./notificationNavigation/NotificationNavigation";

function HomeNavigation({ handleIconClick }) {
  return (
    <ul>
      <li>Homepage</li>
      <Link to="/explore"><li>Explore</li></Link>
      <li onClick={() => handleIconClick(<SearchNavigation />)}>Search</li>
      <Link to="/messages"><li>Messages</li></Link>
      <li onClick={() => handleIconClick(<NotificationNavigation />)}>Notifications</li>
      <li>Create Post</li>
      <Link to="/profile/hello"><li>Profile</li></Link>
      <Link to="/settings"><li>Settings</li></Link>
    </ul>
  );
}

export default HomeNavigation;
