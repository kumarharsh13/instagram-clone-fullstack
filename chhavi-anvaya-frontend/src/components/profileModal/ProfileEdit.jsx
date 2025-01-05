import { useContext, useState } from "react";
import styles from "../profileModal/ProfileEdit.module.css";
import PasswordUpdateModal from "./PasswordUpdateModal";
import { AuthContext } from "../../context/AuthContext";
import EditUserDetails from "./EditUserDetails";

function ProfileEdit({ isVisible, handleModal }) {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const closeModal = () => {
    handleModal(false);
  };

	const handleEditUserDetails = (value) => {
    setIsEditProfile(value);
  };

  const handleEditPaswsord = (value) => {
    setIsEditPassword(value);
  };

  const { user } = useContext(AuthContext);
  if (!isVisible) return null;

  return (
    user && (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <h4 onClick={() => handleEditUserDetails(true)} className={styles.heading4}>
            Edit Profile
          </h4>
          <h4
            onClick={() => handleEditPaswsord(true)}
            className={styles.heading4}
          >
            Change Password
          </h4>
          {/* Close button */}
          <button className={styles.closeButton} onClick={closeModal}>
            Close
          </button>
          <EditUserDetails
            isVisible={isEditProfile}
            handleModal={handleEditUserDetails}
            username={user.username}
          />
          <PasswordUpdateModal
            isVisible={isEditPassword}
            handleModal={handleEditPaswsord}
            username={user.username}
          />
        </div>
      </div>
    )
  );
}

export default ProfileEdit;
