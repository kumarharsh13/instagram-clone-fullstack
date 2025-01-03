import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "../searchNavigation/SearchNavigation.module.css";

function SearchNavigation() {
  const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;

  return (
    <div className={styles.searchNavigation}>
      <div className={styles.searchBar}>
        <input type="search" name="" id="" placeholder="Search to Follow" />
        <span>
          <FontAwesomeIcon
            className={styles.searchIcon}
            icon={faMagnifyingGlass}
          />
        </span>
      </div>
      <div className={styles.searchData}>
        <div className={styles.searchProfileContainer}>
          <div className={styles.searchUserProfileImage}>
            <img src={`${IMAGE_URL}images/profile_image/user.png`} alt="" />
          </div>
          <div className={styles.profileNames}>
            <h3>Gootiya</h3>
            <p>Gootiya Pathaan</p>
          </div>
        </div>
        <div className={styles.searchProfileContainer}>
          <div className={styles.searchUserProfileImage}>
            <img src={`${IMAGE_URL}images/profile_image/user.png`} alt="" />
          </div>
          <div className={styles.profileNames}>
            <h3>Gootiya</h3>
            <p>Gootiya Pathaan</p>
          </div>
        </div>
        <div className={styles.searchProfileContainer}>
          <div className={styles.searchUserProfileImage}>
            <img src={`${IMAGE_URL}images/profile_image/user.png`} alt="" />
          </div>
          <div className={styles.profileNames}>
            <h3>Gootiya</h3>
            <p>Gootiya Pathaan</p>
          </div>
        </div>
        <div className={styles.searchProfileContainer}>
          <div className={styles.searchUserProfileImage}>
            <img src={`${IMAGE_URL}images/profile_image/user.png`} alt="" />
          </div>
          <div className={styles.profileNames}>
            <h3>Gootiya</h3>
            <p>Gootiya Pathaan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchNavigation;
