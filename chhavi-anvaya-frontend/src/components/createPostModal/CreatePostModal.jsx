import styles from '../createPostModal/CreatePostModal.module.css'
import CreatePost from './createPostForm/CreatePostForm'

function CreatePostModal({ isVisible, handleSetCreatePost }) {
	const closeModal = () => {
    handleSetCreatePost(false);
  };
	if (!isVisible) return null;

	return (
		<div className={styles.modalBackdrop}>
			<div className={styles.modalContent}>
				<div className={styles.postContent}>
					<CreatePost closeModal={closeModal} />
				</div>
				{/* Close button */}
				<button className={styles.closeButton} onClick={closeModal}>Close</button>
			</div>
		</div>
	);
}

export default CreatePostModal