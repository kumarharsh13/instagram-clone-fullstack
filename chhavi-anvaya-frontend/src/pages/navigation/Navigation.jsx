import { useContext, useReducer } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCompass,
  faMagnifyingGlass,
  faMessage,
  faHeart,
  faSquarePlus,
  faUser,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../navigation/Navigation.module.css";
import { Link, useNavigate } from "react-router-dom";
import NavigationReducer, {
  SET_ACTIVE_VIEW,
} from "../../reducers/NavigationReducer";
import HomeNavigation from "../../components/HomeNavigation";
import SearchNavigation from "../../components/searchNavigation/SearchNavigation";
import NotificationNavigation from "../../components/notificationNavigation/NotificationNavigation";

function Navigation() {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleIconClick = (view) => {
    dispatch({ type: SET_ACTIVE_VIEW, payload: view });
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const [state, dispatch] = useReducer(NavigationReducer, {
    activeView: (
      <HomeNavigation
        handleIconClick={handleIconClick}
        handleSignOut={handleSignOut}
      />
    ),
  });

  return (
    <div className={styles.sideNavBar}>
      <div className={styles.logo}>
        <h1>ChhaviAnvaya</h1>
      </div>
      <div className={styles.navigation}>
        <nav className={styles.icons}>
          <ul>
            <li
              onClick={() =>
                handleIconClick(
                  <HomeNavigation handleIconClick={handleIconClick} />
                )
              }
            >
              <Link to="/homepage">
                <FontAwesomeIcon icon={faHouse} />
              </Link>
            </li>
            <li>
              <Link to="/explore">
                <FontAwesomeIcon icon={faCompass} />
              </Link>
            </li>
            <li onClick={() => handleIconClick(<SearchNavigation />)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </li>
            <li>
              <Link to="/message">
                <FontAwesomeIcon icon={faMessage} />
              </Link>
            </li>
            <li onClick={() => handleIconClick(<NotificationNavigation />)}>
              <FontAwesomeIcon icon={faHeart} />
            </li>
            <li>
              <FontAwesomeIcon icon={faSquarePlus} />
            </li>
            <li>
              <Link to={`profile/${user?.username}`}>
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <FontAwesomeIcon icon={faGear} />
              </Link>
            </li>
            <li onClick={handleSignOut}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </li>
          </ul>
        </nav>
        <div className={styles.navigationView}>{state.activeView}</div>
      </div>
    </div>
  );
}

export default Navigation;
