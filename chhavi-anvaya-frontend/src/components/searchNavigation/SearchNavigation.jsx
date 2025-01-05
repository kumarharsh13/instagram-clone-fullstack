import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "../searchNavigation/SearchNavigation.module.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { searchUser } from "../../services/userService";

function SearchNavigation() {
  const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    if (query.trim().length > 0) {
      setSearchQuery(query);
    } else {
      setResults([]);
    }
  };

  const fetchSearchResults = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await searchUser(query);
      if (response.success) {
        setResults(response.users);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  return (
    <div className={styles.searchNavigation}>
      <div className={styles.searchBar}>
        <input
          type="search"
          name="search"
          id="search"
          value={searchQuery}
          placeholder="Search to Follow"
          onChange={handleSearchChange}
        />
        <span>
          <FontAwesomeIcon
            className={styles.searchIcon}
            icon={faMagnifyingGlass}
          />
        </span>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.searchData}>
          {results.length === 0 ? (
            <p>No User Found</p>
          ) : (
            results.map((user, index) => (
              <Link to={`/profile/${user.username}`}>
                <div key={index} className={styles.searchProfileContainer}>
                  <div className={styles.searchUserProfileImage}>
                    <img
                      src={
                        user.profile_url
                          ? `${IMAGE_URL}${user.profile_url}`
                          : `${IMAGE_URL}images/profile_image/user.png`
                      }
                      alt={user.username}
                    />
                  </div>
                  <div className={styles.profileNames}>
                    <h3>{user.username}</h3>
                    <p>{user.name}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchNavigation;
