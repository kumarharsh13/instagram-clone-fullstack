import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styles from "../profileModal/ProfileEdit.module.css";
import { changePassword } from "../../services/userService";

function PasswordUpdateModal({ isVisible, handleModal, username }) {
	const navigate = useNavigate()

	const closeModal = () => {
    handleModal(false);
  };


  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await changePassword(values);
        if (response.success) {
          alert("Password changed successfully!");
          resetForm();
					navigate(`/profile/${username}`, { replace: true });
        } else {
          alert(response.message || "Failed to change password");
        }
      } catch (error) {
        console.error("Error submitting updating password", error);
        alert("Something went wrong! Please try again.");
      }
    },
  });

  if (!isVisible) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <form onSubmit={formik.handleSubmit} className={styles.formForPasswordChange}>
          <div className={styles.changePasswordContent}>
            <label htmlFor="oldPassword">
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
								placeholder="Old Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldPassword}
                className={
                  formik.errors.oldPassword && formik.touched.oldPassword
                    ? styles.inputError
                    : ""
                }
              />
              {formik.errors.oldPassword && formik.touched.oldPassword && (
                <div className={styles.errorMessage}>
                  {formik.errors.oldPassword}
                </div>
              )}
            </label>
            <label htmlFor="newPassword">
              <input
                type="password"
                id="newPassword"
                name="newPassword"
								placeholder="New Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className={
                  formik.errors.newPassword && formik.touched.newPassword
                    ? styles.inputError
                    : ""
                }
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <div className={styles.errorMessage}>
                  {formik.errors.newPassword}
                </div>
              )}
            </label>
            <label htmlFor="confirmPassword">
              {" "}
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
								placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? styles.inputError
                    : ""
                }
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <div className={styles.errorMessage}>
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </label>
          </div>
          <div className={styles.submitButton}>
            <button type="submit" disabled={formik.isSubmitting}>
              <h4>Change Password</h4>
            </button>
          </div>
        </form>
        {/* Close button */}
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}

export default PasswordUpdateModal;
