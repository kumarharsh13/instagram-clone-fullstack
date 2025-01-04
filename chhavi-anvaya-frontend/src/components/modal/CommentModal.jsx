import { Link } from "react-router-dom";
import styles from "./FollowModal.module.css";

function CommentModal({ isVisible, handleModal, users, heading }) {
  if (!isVisible) return null;

  const closeModal = () => {
    handleModal(false);
  };

  const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h1>{heading}</h1>
        {users.map((user, index) => {
          return (
            <div className={styles.commentedAccount} key={index}>
              <div className={styles.accountDetails}>
                <div className={styles.accountImage}>
                  <img
                    src={
                      user.profile_url
                        ? `${IMAGE_URL}${user.profile_url}`
                        : `${IMAGE_URL}images/profile_image/user.png`
                    }
                    alt="Commented Account"
                  />
                </div>
                <Link to={`/profile/${user.user.username}`}>
                  <p className={styles.commentUsername}>{user.user.username}</p>
                </Link>
              </div>
              <p className={styles.commentDesc}>{user.comment}</p>
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

export { CommentModal };
