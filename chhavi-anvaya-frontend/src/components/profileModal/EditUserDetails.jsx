import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styles from "../profileModal/ProfileEdit.module.css";
import { editProfileDetails } from "../../services/userService";

function EditUserDetails({ isVisible, handleModal, username }) {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const closeModal = () => {
    handleModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Username must be atleast 3 characters"),
    bio: Yup.string().max(30, "Bio must be atmost 30 characters"),
    mobile: Yup.string().matches(/^[0-9]{10}$/, "Invalid phone number"), // 10 digits phone number
    image: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      image: null,
      mobile: "",
      bio: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await editProfileDetails(values);
        if (response.success) {
          alert("Profile Updated successfully!");
          resetForm();
          navigate(`/profile/${username}`, { replace: true });
        } else {
          alert(response.message || "Failed to update profile");
        }
      } catch (error) {
        console.error("Error submitting updating profile", error);
        alert("Something went wrong! Please try again.");
      }
    },
  });

  if (!isVisible) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.formForPasswordChange}
        >
          <div className={styles.changePasswordContent}>
            <label htmlFor="username">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={
                  formik.touched.username && formik.errors.username
                    ? "error"
                    : ""
                }
              />
              {formik.touched.username && formik.errors.username && (
                <div className="error-message">{formik.errors.username}</div>
              )}
            </label>

            <label htmlFor="bio">
              <input
                type="text"
                id="bio"
                name="bio"
                placeholder="Bio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                className={
                  formik.touched.bio && formik.errors.bio ? "error" : ""
                }
              />
              {formik.touched.bio && formik.errors.bio && (
                <div className="error-message">{formik.errors.bio}</div>
              )}
            </label>

            <label htmlFor="mobile">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Mobile Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
                className={
                  formik.touched.mobile && formik.errors.mobile ? "error" : ""
                }
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="error-message">{formik.errors.mobile}</div>
              )}
            </label>

            {!image && (
              <div className={styles.imageUpload}>
                <label htmlFor="file">
                  <p>Select image from your device</p>
                  <input
                    type="file"
                    name="image" 
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                </label>
                {formik.touched.image && formik.errors.image && (
                  <div>{formik.errors.image}</div>
                )}
              </div>
            )}

            {image && (
              <div className={styles.imagePreview}>
                <img src={image} alt="Uploaded Preview" />
              </div>
            )}
          </div>
          <div className={styles.submitButton}>
            <button type="submit" disabled={formik.isSubmitting}>
              <h4>Edit Profile</h4>
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

export default EditUserDetails;
