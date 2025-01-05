import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../profile/Profile.module.css";
import { AuthContext } from "../../context/AuthContext";
import {
  getMyPosts,
  getOtherUserProfilePost,
} from "../../services/postService";
import { FollowModal } from "../../components/modal/FollowModal";
import { PostModal } from "../../components/modal/PostModal";
import ProfileEdit from "../../components/profileModal/ProfileEdit";
import Loader from "../../components/Loader/Loader";
import { getFollowers, getFollowing } from "../../services/followService";
import { createFollow, deleteFollow } from "../../services/followService";

function Profile() {
  const IMAGE_URL = process.env.REACT_APP_API_URL_IMAGES;
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const [myPost, setMyPost] = useState([]);
  const [isOtherUserFollowing, setIsOtherUserFollowing] = useState();
  const [otherUserPost, setOtherUserPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        if (username === user.username) {
          const response = await getMyPosts();
          setMyPost(response.posts);
        } else {
          const response = await getOtherUserProfilePost(username);
          setOtherUserPost(response.posts);
          setIsOtherUserFollowing(response.isFollowingOtherUser ? true : false);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [username, user.username]);

  return (
    user &&
    (isLoading ? (
      <Loader />
    ) : username === user.username ? (
      <MyProfile username={user.username} myPost={myPost} />
    ) : (
      <OtherUserProfile
        username={username}
        otherUserPost={otherUserPost}
        isOtherUserFollowing={isOtherUserFollowing}
        setIsOtherUserFollowing={setIsOtherUserFollowing}
      />
    ))
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
        <Post posts={myPost} />
      </div>
    );
  }

  function OtherUserProfile({
    username,
    otherUserPost,
    isOtherUserFollowing,
    setIsOtherUserFollowing,
  }) {
    return (
      <div className={styles.profile}>
        <ProfileCard
          username={username}
          posts={otherUserPost}
          bio="This user has no bio."
          isOwnProfile={false}
          isOtherUserFollowing={isOtherUserFollowing}
          setIsOtherUserFollowing={setIsOtherUserFollowing}
        />
        <hr />
        <Post posts={otherUserPost} />
      </div>
    );
  }

  function ProfileCard({
    username,
    posts,
    bio,
    isOwnProfile,
    isOtherUserFollowing,
    setIsOtherUserFollowing,
  }) {
    const [follwer, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isFollower, setIsFollower] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = (value) => {
      setIsEdit(value);
    };

    const handleFollower = (value) => {
      setIsFollower(value);
    };

    const handleFollowing = (value) => {
      setIsFollowing(value);
    };

    const handleOtherUserFollow = async (otherUserId, value) => {
      try {
        if (value) {
          await deleteFollow(user.id, otherUserId);
          setIsOtherUserFollowing(false);
        } else {
          await createFollow(user.id, otherUserId);
          setIsOtherUserFollowing(true);
        }
      } catch (error) {
        console.error("Error while following/unfollowing:", error);
      }
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
            <img
              src={
                posts[0]?.user?.profile_url
                  ? `${IMAGE_URL}${posts[0]?.user?.profile_url}`
                  : `${IMAGE_URL}images/profile_image/user.png`
              }
              alt=""
            />
          </div>
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.nameAndOptions}>
            <h3>{username}</h3>
            {isOwnProfile ? (
              <>
                <button onClick={() => handleEdit(true)}>Edit</button>
                <button>Options</button>
                <ProfileEdit isVisible={isEdit} handleModal={handleEdit} />
              </>
            ) : (
              <>
                {" "}
                {isOtherUserFollowing ? (
                  <button
                    onClick={() =>
                      handleOtherUserFollow(
                        posts[0]?.user_id,
                        isOtherUserFollowing
                      )
                    }
                    className={isOtherUserFollowing ? styles.unfollow : ""}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleOtherUserFollow(
                        posts[0]?.user_id,
                        isOtherUserFollowing
                      )
                    }
                  >
                    Follow
                  </button>
                )}
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
              {follwer.length || 0} Followers
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

  function Post({ posts }) {
    const [isPostModalVisible, setIsPostModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const handlePostModal = (value, post = null) => {
      setSelectedPost(post);
      setIsPostModalVisible(value);
    };

    return (
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
    );
  }
}

export default Profile;
