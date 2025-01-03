import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "../home/Home.module.css";
import { FollowModal as LikeModal } from "../../components/modal/FollowModal";
import { CommentModal } from "../../components/modal/CommentModal";
import {
  getFollowingUserPosts,
  createComment,
} from "../../services/postService";
import { getFollowSuggestion } from "../../services/followService";
import { useFollow } from "../../hooks/useFollow";
import { useLike } from "../../hooks/useLike";

function Home() {
  const { user } = useContext(AuthContext);
  const { followState, setFollowState, handleFollow } = useFollow();
  const [posts, setPosts] = useState([]);
  const [isSuggest, setIsSuggest] = useState(false);
  const [suggestFollow, setSuggestFollow] = useState([]);
  const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;

  const handleFollowSuggestion = (value) => {
    setIsSuggest(value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getFollowingUserPosts();
        setPosts(response.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchFollowSuggestion = async () => {
      try {
        const response = await getFollowSuggestion(user.id);
        setSuggestFollow(response.suggestionFollow);

        const initialFollowState = {};
        response.suggestionFollow.forEach((user) => {
          initialFollowState[user.id] = false;
        });
        setFollowState(initialFollowState);
      } catch (error) {
        console.error("Error fetching follow suggestion:", error);
      }
    };
    fetchFollowSuggestion();
  }, [user, setFollowState]);

  return (
    user && (
      <div className={styles.home}>
        <div className={styles.feed}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} user_id={user.id} />
            ))
          ) : (
            <p className={styles.noPost}>Follow to CatchUp</p>
          )}
        </div>
        <div className={styles.sugesstionToFollow}>
          <div className={styles.suggestionTextLink}>
            <p>Suggestion</p>
            <button onClick={() => handleFollowSuggestion(true)}>
              See All
            </button>
            <LikeModal
              isVisible={isSuggest}
              handleModal={handleFollowSuggestion}
              users={suggestFollow}
              heading={"Suggestion to follow"}
            />
          </div>
          {suggestFollow && suggestFollow.length > 0 ? (
            suggestFollow.map((follow) => {
              const isFollowing = followState[follow.id] || false;
              return (
                <div className={styles.suggestedAccount} key={follow.id}>
                  <div className={styles.accountDetails}>
                    <div className={styles.accountImage}>
                      <img
                        src={follow.profile_url || `${IMAGE_URL}images/profile_image/user.png`}
                        alt={follow.username}
                      />
                    </div>
                    <Link to={`/profile/${follow.username}`}>
                      {" "}
                      <p>{follow.username}</p>
                    </Link>
                  </div>
                  <button
                    onClick={() => handleFollow(follow.id)}
                    className={isFollowing ? styles.unfollow : ""}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>{" "}
                </div>
              );
            })
          ) : (
            <p>No suggestions available</p>
          )}
        </div>
      </div>
    )
  );

  function PostCard({ post, user_id }) {
    const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;
    const [likes, setLike] = useState(post.likes.length || 0);
    const [comments, setComments] = useState(post.comments.length || 0);
    const [isLiked, setIsLiked] = useState(
      post.likes.some((like) => like.user_id === user_id)
    );
    const [isLike, setIsLike] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const { animateHeart, updateLikes } = useLike();

    const handleLikeModal = (value) => {
      setIsLike(value);
    };

    const handleCommentModal = (value) => {
      setIsComment(value);
    };

    const validationSchema = Yup.object({
      comment: Yup.string().required("Comment Required"),
    });

    const formik = useFormik({
      initialValues: {
        comment: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          const response = await createComment(values, post.id, user_id);

          if (response.success) {
            alert("Comment Successfully");
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

    return (
      <div className={styles.feedContainer}>
        <div className={styles.profilePostedBy}>
          <div className={styles.profilePostedByImage}>
            <img src={post.user.profile_url || `${IMAGE_URL}images/profile_image/user.png` } alt="" />
          </div>
          <Link to={`/profile/${post.user.username}`}>
            <h3>{post.user.username}</h3>
          </Link>
        </div>
        <div
          className={styles.postImageContainer}
          onDoubleClick={() =>
            updateLikes(isLiked, setIsLiked, setLike, post.id, user_id)
          }
        >
          <img
            src={`${IMAGE_URL}${post.image_url}`}
            alt={post.id}
            className={animateHeart ? styles.heartAnimation : ""}
          />
          <FontAwesomeIcon icon={faHeartSolid} className={`${styles.heartIcon} ${animateHeart ? styles.animate : ""}`} />
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
            onClick={() => handleCommentModal(true)}
          >
            {comments > 0 ? comments : ""}
          </div>
        </div>
        <LikeModal
          isVisible={isLike}
          handleModal={handleLikeModal}
          users={post.likes}
          heading={"Likes"}
        />
        <CommentModal
          isVisible={isComment}
          handleModal={handleCommentModal}
          users={post.comments}
          heading={"Comments"}
        />
        <div className={styles.captions}>{post.caption}</div>
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
                  formik.touched.comment && formik.errors.comment ? "error" : ""
                }
              />
              {formik.touched.comment && formik.errors.comment && (
                <div className="error-message">{formik.errors.comment}</div>
              )}
            </label>
            <button type="submit" disabled={formik.isSubmitting}>
              <h4>Comment</h4>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
