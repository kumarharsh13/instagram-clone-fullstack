import { Link } from "react-router-dom";
import styles from "./FollowModal.module.css";
import { useEffect } from "react";
import { useFollow } from "../../hooks/useFollow";

function FollowModal({ isVisible, handleModal, users, heading }) {
  const { followState, setFollowState, handleFollow } = useFollow();
  useEffect(() => {
    const initialFollowState = {};

    users.forEach((user) => {
      // Add to followState for followers
      if (user?.follower?.id) {
        initialFollowState[user.follower.id] = false;
      }

      // Add to followState for following
      if (user?.following?.id) {
        initialFollowState[user.following.id] = true;
      }

      // Add to followState for suggestions
      if (user?.id) {
        initialFollowState[user.id] = false;
      }
    });

    setFollowState(initialFollowState);
  }, [users, setFollowState]);

  const closeModal = () => {
    handleModal(false);
  };

  const handleFollowClick = (userId, isRemoved) => {
    handleFollow(userId, isRemoved);
  };

  const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;

  if (!isVisible) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h1>{heading}</h1>
        {users.map((user, index) => {
          const user_name =
            user?.username ||
            user?.user?.username ||
            user?.follower?.username ||
            user?.following?.username ||
            "Unknown User";

          const isFollower = user?.follower?.username;
          const isFollowing = user?.following?.username;
          const isSuggestionToFollow = user?.username;

          const userIdToToggle = isFollower
            ? user?.follower?.id
            : isFollowing
            ? user?.following?.id
            : isSuggestionToFollow
            ? user?.id
            : null;

          return (
            <div className={styles.suggestedAccount} key={index}>
              <div className={styles.accountDetails}>
                <div className={styles.accountImage}>
                  <img
                    src={
                      user.profile_url
                        ? `${IMAGE_URL}${user.profile_url}`
                        : `${IMAGE_URL}images/profile_image/user.png`
                    }
                    alt="Suggested Account"
                  />
                </div>
                <Link to={`/profile/${user_name}`}>
                  <p>{user_name}</p>
                </Link>
              </div>

              {isFollower && userIdToToggle && (
                <button
                  onClick={() => handleFollowClick(userIdToToggle, true)}
                  className={followState[userIdToToggle] ? styles.unfollow : ""}
                >
                  {followState[userIdToToggle] ? "Follow" : "Remove"}
                </button>
              )}

              {isFollowing && userIdToToggle && (
                <button
                  onClick={() => handleFollowClick(userIdToToggle)}
                  className={followState[userIdToToggle] ? styles.unfollow : ""}
                >
                  {followState[userIdToToggle] ? "Unfollow" : "Follow"}
                </button>
              )}

              {isSuggestionToFollow && userIdToToggle && (
                <button
                  onClick={() => handleFollowClick(userIdToToggle)}
                  className={followState[userIdToToggle] ? styles.unfollow : ""}
                >
                  {followState[userIdToToggle] ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          );
        })}
        {/* Close button */}
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export { FollowModal };
