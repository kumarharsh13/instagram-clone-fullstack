import styles from "./FollowModal.module.css";

function CommentModal({ isVisible, handleModal, users, heading }) {
	if (!isVisible) return null;

	const closeModal = () => {
		handleModal(false);
	};

	return (
		<div className={styles.modalBackdrop}>
			<div className={styles.modalContent}>
				<h1>{heading}</h1>
				{users.map((user, index) => {
					return (
						<div className={styles.commentedAccount} key={index}>
							<div className={styles.accountDetails}>
								<div className={styles.accountImage}>
									<img src="../../croissant.jpg" alt="Commented Account" />
								</div>
								<p className={styles.commentUsername}>{user.user.username}</p>
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
