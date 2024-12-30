import { useParams } from "react-router-dom";
import styles from "../profile/Profile.module.css";
import { AuthContext } from "../../context/AuthContext";
import { getMyPosts } from "../../services/postService";
import { useContext, useEffect, useState } from "react";
import { FollowModal } from "../../components/modal/FollowModal";
import { getFollowers, getFollowing } from "../../services/followService";

function Profile() {
  const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const [myPost, setMyPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getMyPosts();
        setMyPost(response.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return user && username === user.username ? (
    <MyProfile username={user.username} myPost={myPost} />
  ) : (
    <OtherUserProfile username={username} />
  );

  function MyProfile({ username, myPost }) {
    return (
      <div className={styles.profile}>
        <ProfileCard
          username={username}
          posts={myPost}
          bio={myPost[0]?.user?.bio || "No bio available"}
          isOwnProfile={true}
        />
        <hr />
        <div className={styles.userPost}>
          {myPost.length > 0 ? (
            myPost.map((post) => (
              <div className={styles.imageContainer} key={post.id}>
                <img src={`${IMAGE_URL}${post.image_url}`} alt={post.id} />
              </div>
            ))
          ) : (
            <p>No posts to show</p>
          )}
        </div>
      </div>
    );
  }

  function ProfileCard({ username, posts, bio, isOwnProfile }) {
    const [follwer, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isFollower, setIsFollower] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollower = (value) => {
      setIsFollower(value);
    };

    const handleFollowing = (value) => {
      setIsFollowing(value);
    };

    useEffect(() => {
      const follower = async () => {
        try {
          const response = await getFollowers(username);
          setFollower(response.myFollowers);
        } catch (error) {
          console.error("Unable to fetch follower", error);
        }
      };
      follower();
    }, [username]);

    useEffect(() => {
      const following = async () => {
        try {
          const response = await getFollowing(username);
          setFollowing(response.myFollowings);
        } catch (error) {
          console.error("Unable to fetch follower", error);
        }
      };
      following();
    }, [username]);

    return (
      <div className={styles.profileInfo}>
        <div className={styles.profilePicture}>
          <div className={styles.profileImageContainer}>
            <img src="../../croissant.jpg" alt="" />
          </div>
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.nameAndOptions}>
            <h3>{username}</h3>
            {isOwnProfile && (
              <>
                <button>Edit</button>
                <button>Options</button>
              </>
            )}
          </div>
          <div className={styles.postsAndFollows}>
            <div className={styles.postsCount}>{posts.length || 0} Posts</div>
            <div
              className={styles.followerCount}
              onClick={() => handleFollower(true)}
            >
              {follwer.length || 0}  Followers
            </div>
            <div
              className={styles.followingCount}
              onClick={() => handleFollowing(true)}
            >
              {following.length || 0} Following
            </div>
            <FollowModal
              isVisible={isFollower}
              handleModal={handleFollower}
              users={follwer}
              heading={"Followers"}
            />
            <FollowModal
              isVisible={isFollowing}
              handleModal={handleFollowing}
              users={following}
              heading={"Following"}
            />
          </div>
          <div className={styles.bio}>{bio}</div>
        </div>
      </div>
    );
  }

  function OtherUserProfile({ username }) {
    return (
      <div className={styles.profile}>
        <ProfileCard
          username={username}
          posts={[]}
          bio="This user has no bio."
          isOwnProfile={false}
        />
        <hr />
        <div className={styles.userPost}>
          {/* Example of posts for another user, you could populate this from API */}
          <div className={styles.imageContainer}>
            <img src="../../croissant.jpg" alt="" />
          </div>
          <div className={styles.imageContainer}>
            <img src="../../croissant.jpg" alt="" />
          </div>
          <div className={styles.imageContainer}>
            <img src="../../croissant.jpg" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
