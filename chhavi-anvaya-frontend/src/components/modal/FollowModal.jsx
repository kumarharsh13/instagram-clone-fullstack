import styles from "./FollowModal.module.css";

function FollowModal({ isVisible, handleLikeModal, users, heading }) {
  if (!isVisible) return null;

  const closeModal = () => {
    handleLikeModal(false);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h1>{heading}</h1>
        {users.map((user, index) => {
          return (
            <div className={styles.suggestedAccount} key={index}>
              <div className={styles.accountDetails}>
                <div className={styles.accountImage}>
                  <img src="../../croissant.jpg" alt="Suggested Account" />
                </div>
                <p>{user.user.username}</p>
              </div>
              <button>Follow</button>
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
