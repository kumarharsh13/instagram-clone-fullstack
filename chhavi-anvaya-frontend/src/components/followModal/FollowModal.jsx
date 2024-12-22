import styles from "./FollowModal.module.css"; // Import the modal's CSS styles

function FollowModal({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.suggestedAccount}>
          <div className={styles.accountDetails}>
            <div className={styles.accountImage}>
              <img src="../../croissant.jpg" alt="Suggested Account" />
            </div>
            <p>gajodhar</p>
          </div>
          <button>Follow</button>
        </div>
        {/* Close button */}
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default FollowModal;
