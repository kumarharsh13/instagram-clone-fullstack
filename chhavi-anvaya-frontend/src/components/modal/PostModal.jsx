import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import styles from "./PostModal.module.css";
import { FollowModal as LikeModal } from "../../components/modal/FollowModal";
import { useLike } from "../../hooks/useLike";
import { createComment } from "../../services/postService";

function PostModal({ isVisible, handleModal, post }) {
  const { user } = useContext(AuthContext);
  const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;

  const [likes, setLike] = useState(post.likes.length || 0);
  const [comments, setComments] = useState(post.comments.length || 0);
  const [isLiked, setIsLiked] = useState(
    post.likes.some((like) => like.user_id === user.id)
  );
  const [isLikeModalVisible, setIsLikeModalVisible] = useState(false);

  const { animateHeart, updateLikes } = useLike();

  const closeModal = () => {
    handleModal(false);
  };

  const handleLikeModal = (value) => {
    setIsLikeModalVisible(value);
  };

  const validationSchema = Yup.object({
    comment: Yup.string().required("Comment Required"),
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await createComment(values, post.id, user.id);

        if (response.success) {
          alert("Comment added successfully!");
          setComments(comments + 1);
          resetForm();
        } else {
          alert(response.message || "Failed to post comment");
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
        alert("Something went wrong! Please try again.");
      }
    },
  });

  if (!isVisible) return null;

  return (
    user && (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <div className={styles.postContainer}>
            <div
              className={styles.postImageContainer}
              onDoubleClick={() =>
                updateLikes(isLiked, setIsLiked, setLike, post.id, user.id)
              }
            >
              <img src={`${IMAGE_URL}${post.image_url}`} alt={post.id} />
              <FontAwesomeIcon
                icon={faHeartSolid}
                className={`${styles.heartIcon} ${
                  animateHeart ? styles.animate : ""
                }`}
              />
            </div>
            <div className={styles.postDetails}>
              <div className={styles.userDetails}>
                <div className={styles.accountImage}>
                  <img
                    src={
                      post.user.profile_url
                        ? `${IMAGE_URL}${post.user.profile_url}`
                        : `${IMAGE_URL}images/profile_image/user.png`
                    }
                    alt="Commented Account"
                  />
                </div>
                <Link to={`/profile/${post.user.username}`}>
                  <h1>{post.user.username}</h1>
                </Link>
                {user.id === post.user.id ? (
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className={styles.trashCan}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className={styles.likeAndCommentIcons}>
                <FontAwesomeIcon
                  icon={isLiked ? faHeartSolid : faHeart}
                  className={isLiked ? styles.liked : ""}
                />
                <div
                  className={styles.likeCounts}
                  onClick={() => handleLikeModal(true)}
                >
                  {likes > 0 ? likes : ""}
                </div>
                <FontAwesomeIcon icon={faComment} />
                <div
                  className={styles.likeCounts}
                  onClick={() => handleLikeModal(true)}
                >
                  {comments > 0 ? comments : ""}
                </div>
                <LikeModal
                  isVisible={isLikeModalVisible}
                  handleModal={handleLikeModal}
                  users={post.likes}
                  heading={"Likes"}
                />
              </div>
              <div className={styles.captions}>{post.caption}</div>
              <hr />
              <div className={styles.commentList}>
                {post.comments.map((comment, index) => (
                  <div className={styles.commentedAccount} key={index}>
                    <div className={styles.accountDetails}>
                      <div className={styles.accountImage}>
                        <img
                          src={
                            comment.user.profile_url
                              ? `${IMAGE_URL}${comment.user.profile_url}`
                              : `${IMAGE_URL}images/profile_image/user.png`
                          }
                          alt="Commented Account"
                        />
                      </div>
                      <Link to={`/profile/${comment.user.username}`}>
                        <p className={styles.commentUsername}>
                          {comment.user.username}
                        </p>
                      </Link>
                    </div>
                    <p className={styles.commentDesc}>{comment.comment}</p>{" "}
                  </div>
                ))}
              </div>

              <div className={styles.comments}>
                <form
                  onSubmit={formik.handleSubmit}
                  className={styles.addCommentContainer}
                >
                  <label htmlFor="comment">
                    <input
                      type="text"
                      id="comment"
                      name="comment"
                      placeholder="Add your comment here"
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comment}
                      className={
                        formik.touched.comment && formik.errors.comment
                          ? "error"
                          : ""
                      }
                    />
                    {formik.touched.comment && formik.errors.comment && (
                      <div className="error-message">
                        {formik.errors.comment}
                      </div>
                    )}
                  </label>
                  <button type="submit" disabled={formik.isSubmitting}>
                    <h4>Comment</h4>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Close Modal Button */}
          <button className={styles.closeButton} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    )
  );
}

export { PostModal };
