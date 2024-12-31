import styles from "../profile/Profile.module.css";
import { AuthContext } from "../../context/AuthContext";
import { getPosts } from "../../services/postService";
import { useContext, useEffect, useState } from "react";
import { PostModal } from "../../components/modal/PostModal";

function Explore() {
  const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;
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

  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostModal = (value, post = null) => {
    setSelectedPost(post);
    setIsPostModalVisible(value);
  };

  return (
    user && (
      <div className={styles.userPost}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className={styles.imageContainer} key={post.id}>
              <img
                src={`${IMAGE_URL}${post.image_url}`}
                alt={post.id}
                onClick={() => handlePostModal(true, post)}
              />
            </div>
          ))
        ) : (
          <p className={styles.noPost}>No posts to show</p>
        )}
        {selectedPost && (
          <PostModal
            isVisible={isPostModalVisible}
            handleModal={setIsPostModalVisible}
            post={selectedPost}
          />
        )}
      </div>
    )
  );
}

export default Explore;
