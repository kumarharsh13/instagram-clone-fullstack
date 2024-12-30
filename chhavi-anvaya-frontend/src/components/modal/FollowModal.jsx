import { Link } from "react-router-dom";
import styles from "./FollowModal.module.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createFollow, deleteFollow } from "../../services/followService";

function FollowModal({ isVisible, handleModal, users, heading }) {
  const [removeFollower, setRemoveFollower] = useState({});
  const [unfollowFollowing, setUnfollowFollowing] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const initialFollowerList = {};
    const initialFollowingList = {};

    users.forEach((user) => {
      if (user.follower) {
        initialFollowerList[user.follower.id] = false; // False means not removed
      }
      if (user.following) {
        initialFollowingList[user.following.id] = false; // False means not unfollowed
      }
    });

    setRemoveFollower(initialFollowerList);
    setUnfollowFollowing(initialFollowingList);
  }, [users]);

  const closeModal = () => {
    handleModal(false);
  };

  const handleFollow = async (userIdToToggle, isFollower) => {
    if (isFollower) {
      try {
        const currentState = removeFollower[userIdToToggle];
        if (currentState) {
          await createFollow(userIdToToggle, user.id);
        } else {
          await deleteFollow(userIdToToggle, user.id);
        }
        setRemoveFollower((prev) => ({
          ...prev,
          [userIdToToggle]: !prev[userIdToToggle],
        }));
      } catch (error) {
        console.error("Error while following/unfollowing:", error);
      }
    } else {
      try {
        const currentState = unfollowFollowing[userIdToToggle];
        if (currentState) {
          await createFollow(user.id, userIdToToggle);
        } else {
          await deleteFollow(user.id, userIdToToggle);
        }
        setUnfollowFollowing((prev) => ({
          ...prev,
          [userIdToToggle]: !prev[userIdToToggle],
        }));
      } catch (error) {
        console.error("Error while following/unfollowing:", error);
      }
    }
  };

  if (!isVisible) return null;

  console.log(users)
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h1>{heading}</h1>
        {users.map((user, index) => {
          const user_name =
            user?.user?.username ||
            user?.follower?.username ||
            user?.following?.username ||
            "Unknown User";

          const isFollower = user?.follower?.username;
          const isFollowing = user?.following?.username;
          const userIdToToggle = isFollower ? user?.follower?.id : user?.following?.id;

          return (
            <div className={styles.suggestedAccount} key={index}>
              <div className={styles.accountDetails}>
                <div className={styles.accountImage}>
                  <img src="../../croissant.jpg" alt="Suggested Account" />
                </div>
                <Link to={`/profile/${user_name}`}>
                  <p>{user_name}</p>
                </Link>
              </div>
              {isFollower && (
                <button
                  onClick={() => handleFollow(userIdToToggle, true)}
                  className={removeFollower[userIdToToggle] ? styles.unfollow : ""}
                >
                  {removeFollower[userIdToToggle] ? "Follow" : "Remove"}
                </button>
              )}

              {isFollowing && (
                <button
                  onClick={() => handleFollow(userIdToToggle, false)}
                  className={unfollowFollowing[userIdToToggle] ? styles.unfollow : ""}
                >
                  {unfollowFollowing[userIdToToggle] ? "Follow" : "Unfollow"}
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
