import { useParams } from "react-router-dom";
import styles from "../profile/Profile.module.css";

function Profile() {
  const { username } = useParams();

  return (
    <div className={styles.profile}>
      <div className={styles.profileInfo}>
        <div className={styles.profilePicture}>
          <div className={styles.profileImageContainer}>
            <img src="../../croissant.jpg" alt="" />
          </div>
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.nameAndOptions}>
            <h3>{username} </h3>
            <button>Edit</button>
            <button>Following</button>
            <button>Message</button>
            <button>Options</button>
          </div>
          <div className={styles.postsAndFollows}>
            <div className={styles.postsCount}>27 Posts</div>
            <div className={styles.followerCount}>200 Followers</div>
            <div className={styles.followingCount}>250 Following</div>
          </div>
          <div className={styles.bio}>
            Kaha Chal Hain Dil kaa Rasta Bin Kadmo K
          </div>
          <div className={styles.mutualFollowing}></div>
        </div>
      </div>
      <hr />
      <div className={styles.userPost}>
        <div className={styles.imageContainer}>
          <img src="../../croissant.jpg" alt="" />
        </div>
        <div className={styles.imageContainer}>
          <img src="../../croissant.jpg" alt="" />
        </div>
        <div className={styles.imageContainer}>
          <img src="../../croissant.jpg" alt="" />
        </div>
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

export default Profile;
