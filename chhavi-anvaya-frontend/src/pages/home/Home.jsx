import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "../home/Home.module.css";
import { getPosts } from "../../services/postService";

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

  console.log("Data: " + JSON.stringify(posts));
  console.log("Count: " + posts.length);
  return (
    user && (
      <div className={styles.home}>
        <div className={styles.feed}>
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
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

  function PostCard({ post }) {
    const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES 
    const imageUrl = `${IMAGE_URL}${post.image_url}`;
    return (
      <div className={styles.feedContainer}>
        <div className={styles.profilePostedBy}>
          <div className={styles.profilePostedByImage}>
            <img src="../../croissant.jpg" alt="" />
          </div>
          <h3>{post.user.username}</h3>
        </div>
        <div className={styles.postImageContainer}>
          <img src={imageUrl} alt={post.id} />
        </div>
        <div className={styles.likeAndCommentIcons}>
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div className={styles.likeCounts}>876 Likes</div>
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
