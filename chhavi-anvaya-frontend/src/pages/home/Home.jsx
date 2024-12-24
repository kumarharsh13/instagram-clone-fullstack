import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "../home/Home.module.css";

function Home() {
  const { user, signOut } = useContext(AuthContext);

  return (
    user && (
      <div className={styles.home}>
        <div className={styles.feed}>
          <div className={styles.feedContainer}>
            <div className={styles.profilePostedBy}>
              <div className={styles.profilePostedByImage}>
                <img src="../../croissant.jpg" alt="" />
              </div>
              <h3>{user.username}</h3>
            </div>
            <div className={styles.postImageContainer}>
              <img src="../../croissant.jpg" alt="" />
            </div>
            <div className={styles.likeAndCommentIcons}>
              <FontAwesomeIcon icon={faHeart} />
              <FontAwesomeIcon icon={faComment} />
            </div>
            <div className={styles.likeCounts}>876 Likes</div>
            <div className={styles.captions}>
              Chlo Chle Kahi Door Duniya k Parre
            </div>
            <div className={styles.comments}>
              <p>View all 65 comments</p>
              <input type="text" placeholder="Add your comment here" />
            </div>
          </div>

          <div className={styles.feedContainer}>
            <div className={styles.profilePostedBy}>
              <div className={styles.profilePostedByImage}>
                <img src="../../croissant.jpg" alt="" />
              </div>
              <h3>gootiya</h3>
            </div>
            <div className={styles.postImageContainer}>
              <img src="../../croissant.jpg" alt="" />
            </div>
            <div className={styles.likeAndCommentIcons}>
              <FontAwesomeIcon icon={faHeart} />
              <FontAwesomeIcon icon={faComment} />
            </div>
            <div className={styles.likeCounts}>876 Likes</div>
            <div className={styles.captions}>
              Chlo Chle Kahi Door Duniya k Parre
            </div>
            <div className={styles.comments}>
              <p>View all 65 comments</p>
              <input type="text" placeholder="Add your comment here" />
            </div>
          </div>

          <div className={styles.feedContainer}>
            <div className={styles.profilePostedBy}>
              <div className={styles.profilePostedByImage}>
                <img src="../../croissant.jpg" alt="" />
              </div>
              <h3>gootiya</h3>
            </div>
            <div className={styles.postImageContainer}>
              <img src="../../croissant.jpg" alt="" />
            </div>
            <div className={styles.likeAndCommentIcons}>
              <FontAwesomeIcon icon={faHeartSolid} />
              <FontAwesomeIcon icon={faComment} />
            </div>
            <div className={styles.likeCounts}>876 Likes</div>
            <div className={styles.captions}>
              Chlo Chle Kahi Door Duniya k Parre
            </div>
            <div className={styles.comments}>
              <p>View all 65 comments</p>
              <input type="text" placeholder="Add your comment here" />
            </div>
          </div>
          <div className={styles.feedContainer}>
            <div className={styles.profilePostedBy}>
              <div className={styles.profilePostedByImage}>
                <img src="../../croissant.jpg" alt="" />
              </div>
              <h3>gootiya</h3>
            </div>
            <div className={styles.postImageContainer}>
              <img src="../../croissant.jpg" alt="" />
            </div>
            <div className={styles.likeAndCommentIcons}>
              <FontAwesomeIcon icon={faHeart} />
              <FontAwesomeIcon icon={faComment} />
            </div>
            <div className={styles.likeCounts}>876 Likes</div>
            <div className={styles.captions}>
              Chlo Chle Kahi Door Duniya k Parre
            </div>
            <div className={styles.comments}>
              <p>View all 65 comments</p>
              <input type="text" placeholder="Add your comment here" />
            </div>
          </div>
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
}

export default Home;
