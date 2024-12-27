import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "../home/Home.module.css";
import { getPosts, createLike, deleteLike } from "../../services/postService";

function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    user && (
      <div className={styles.home}>
        <div className={styles.feed}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} user_id={user.id} />
            ))
          ) : (
            <p>No Post to Show</p>
          )}
        </div>
        <div className={styles.sugesstionToFollow}>
          <div className={styles.suggestionTextLink}>
            <p>Sugeestion for you</p>
            <a href="http://www.google.com" target="_blank">
              See All
            </a>
          </div>
          <div className={styles.suggestedAccount}>
            <div className={styles.accountDetails}>
              <div className={styles.accountImage}>
                <img src="../../croissant.jpg" alt="" />
              </div>
              <p>gajodhar</p>
            </div>
            <button>Follow</button>
          </div>
          <div className={styles.suggestedAccount}>
            <div className={styles.accountDetails}>
              <div className={styles.accountImage}>
                <img src="../../croissant.jpg" alt="" />
              </div>
              <p>gajodhar</p>
            </div>
            <button>Follow</button>
          </div>
          <div className={styles.suggestedAccount}>
            <div className={styles.accountDetails}>
              <div className={styles.accountImage}>
                <img src="../../croissant.jpg" alt="" />
              </div>
              <p>gajodhar</p>
            </div>
            <button>Follow</button>
          </div>
          <div className={styles.suggestedAccount}>
            <div className={styles.accountDetails}>
              <div className={styles.accountImage}>
                <img src="../../croissant.jpg" alt="" />
              </div>
              <p>gajodhar</p>
            </div>
            <button>Follow</button>
          </div>
          <div className={styles.suggestedAccount}>
            <div className={styles.accountDetails}>
              <div className={styles.accountImage}>
                <img src="../../croissant.jpg" alt="" />
              </div>
              <p>gajodhar</p>
            </div>
            <button>Follow</button>
          </div>
        </div>
      </div>
    )
  );

  function PostCard({ post, user_id }) {
    const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;
    const [likes, setLike] = useState(post.likes.length || 0);
    const [isLiked, setIsLiked] = useState(
      post.likes.some((like) => like.user_id === user_id)
    );
    const [animateHeart, setAnimateHeart] = useState(false);

    const handlePostLike = async () => {
      try {
        if (isLiked) {
          await deleteLike(post.id, user_id);
          setLike(likes - 1);
          setIsLiked(false);
        } else {
          await createLike(post.id, user_id);
          setLike(likes + 1);
          setIsLiked(true);
          setAnimateHeart(true);
        }
        setTimeout(() => setAnimateHeart(false), 1000);
      } catch (error) {
        console.error("Error liking post: ", error);
      }
    };

    return (
      <div className={styles.feedContainer}>
        <div className={styles.profilePostedBy}>
          <div className={styles.profilePostedByImage}>
            <img src="../../croissant.jpg" alt="" />
          </div>
          <h3>{post.user.username}</h3>
        </div>
        <div
          className={styles.postImageContainer}
          onDoubleClick={handlePostLike}
        >
          <img
            src={`${IMAGE_URL}${post.image_url}`}
            alt={post.id}
            className={animateHeart ? styles.heartAnimation : ""}
          />
        </div>
        <div className={styles.likeAndCommentIcons}>
          <FontAwesomeIcon
            icon={isLiked ? faHeartSolid : faHeart}
            className={isLiked ? styles.liked : ""}
          />
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div className={styles.likeCounts}>{likes} Likes</div>
        <div className={styles.captions}>{post.caption}</div>
        <div className={styles.comments}>
          <p>View all 65 comments</p>
          <input type="text" placeholder="Add your comment here" />
        </div>
      </div>
    );
  }
}

export default Home;
