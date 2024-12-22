import { useReducer } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import styles from "../navigation/Navigation.module.css";
import { Link } from "react-router-dom";
import NavigationReducer, {
  SET_ACTIVE_VIEW,
} from "../../reducers/NavigationReducer";
import HomeNavigation from "../../components/HomeNavigation";
import SearchNavigation from "../../components/searchNavigation/SearchNavigation";
import NotificationNavigation from "../../components/notificationNavigation/NotificationNavigation";

function Navigation() {
  const handleIconClick = (view) => {
    dispatch({ type: SET_ACTIVE_VIEW, payload: view });
  };

  const [state, dispatch] = useReducer(NavigationReducer, {
    activeView: <HomeNavigation handleIconClick={handleIconClick} />,
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
              <Link to="profile/hello">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <FontAwesomeIcon icon={faGear} />
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.navigationView}>{state.activeView}</div>
      </div>
    </div>
  );
}

export default Navigation;
