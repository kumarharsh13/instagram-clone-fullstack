import { useState, useRef, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../createPostForm/CreatePostForm.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { create_post } from "../../../services/postService";

const step1ValidationSchema = Yup.object({
  image: Yup.mixed().required("Image required"),
});

const step2ValidationSchema = Yup.object({
  caption: Yup.string().required("Caption Required"),
});

function CreatePostForm({ closeModal }) {
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();
  const formDataRef = useRef({
    image: null,
    caption: "",
    user_id: user.id
  })
  const navigate = useNavigate();

  const formikStep1 = useFormik({
    initialValues: {
      image: null,
    },
    validationSchema: step1ValidationSchema,
    onSubmit: (values) => {
      formDataRef.current.image = values.image;
      setStep(2);
    },
  });

  const formikStep2 = useFormik({
    initialValues: {
      caption: "",
    },
    validationSchema: step2ValidationSchema,
    onSubmit: (values) => {
      formDataRef.current.caption = values.caption
      formDataRef.current.user_id = user.id;
      handleFinalSubmit();
    },
  });

  const handleFinalSubmit = async () => {
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('image', formDataRef.current.image);
      formDataToSubmit.append('caption', formDataRef.current.caption);
      formDataToSubmit.append('user_id', formDataRef.current.user_id);

      const response = await create_post(formDataToSubmit);
      if (response.success) {
        alert("Post Published Successfully!");
        closeModal();
        navigate("/homepage", { replace: true });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error publishing post.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      formikStep1.setFieldValue("image", file);
    }
  };

  return (
    <div className={styles.createPostModal}>
      <h1>Create your post</h1>

      {step === 1 && (
        <form onSubmit={formikStep1.handleSubmit}>
          <div className={styles.prevNextButton}>
            <button
              type="button"
              onClick={() => setStep(1)} 
              disabled={step === 1}
            >
              Prev
            </button>
            <button type="submit" disabled={!image}>
              Next
            </button>
          </div>

          {!image && (
            <div className={styles.imageUpload}>
              <label htmlFor="file">
                <p>Select image from your device</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
              {formikStep1.touched.image && formikStep1.errors.image && (
                <div>{formikStep1.errors.image}</div>
              )}
            </div>
          )}

          {image && (
            <div className={styles.imagePreview}>
              <img src={image} alt="Uploaded Preview" />
            </div>
          )}
        </form>
      )}

      {step === 2 && (
        <form onSubmit={formikStep2.handleSubmit}>
          <div className={styles.prevNextButton}>
            <button
              type="button"
              onClick={() => setStep(1)}
            >
              Prev
            </button>
            <button type="submit">Publish</button>
          </div>

          <div className={styles.caption}>
            {image && (
              <div className={styles.imagePreview}>
                <img src={image} alt="Uploaded Preview" />
              </div>
            )}
            <label htmlFor="caption">
              <textarea
                name="caption"
                value={formikStep2.values.caption}
                onChange={formikStep2.handleChange}
                onBlur={formikStep2.handleBlur}
                id="caption"
                placeholder="Add caption here"
                required
              />
              {formikStep2.touched.caption && formikStep2.errors.caption && (
                <div>{formikStep2.errors.caption}</div>
              )}
            </label>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreatePostForm;
