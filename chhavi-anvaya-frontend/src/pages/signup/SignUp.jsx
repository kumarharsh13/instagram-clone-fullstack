import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../../services/authService";
import styles from "../signup/SignUp.module.css";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Invalid phone number") // 10 digits phone number
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  fullName: Yup.string().required("Full name is required"),
});

function SignUp() {
  const navigate = useNavigate(); // To redirect after successful signup

  // Formik hook
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      mobile: "",
      password: "",
      fullName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await signUp(values);
        if (response.success) {
          navigate('/');
        } else {
          alert(response.message);
        }
      } catch (error) {
        alert("Something went wrong! Please try again.");
      }
    },
  });

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpFormDescription}>
        <div className={styles.logoNameDetail}>
          <div className={styles.logo}>
            <h1>ChhaviAnvaya</h1>
          </div>
          <div className={styles.description}>
            <span>
              <h3>Sign Up to see photos and videos from your friends.</h3>
            </span>
          </div>
        </div>
        <div className={styles.signUpForm}>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.signUpFormContant}>
              <label htmlFor="email">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error-message">{formik.errors.email}</div>
                )}
              </label>

              <label htmlFor="mobile">
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile Number"
                  required
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

              <label htmlFor="password">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error-message">{formik.errors.password}</div>
                )}
              </label>

              <label htmlFor="fullName">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  className={
                    formik.touched.fullName && formik.errors.fullName
                      ? "error"
                      : ""
                  }
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <div className="error-message">{formik.errors.fullName}</div>
                )}
              </label>

              <label htmlFor="username">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  required
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
            </div>

            <div className={styles.tncDes}>
              <div className={styles.descriptionContactInfo}>
                <div>
                  People who use our service may have uploaded your contact
                  information to Instagram.
                  <a
                    href="www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div className={styles.termsAndCondition}>
                <div>
                  By signing up, you agree to our
                  <a
                    href="www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Terms
                  </a>
                  ,
                  <a
                    href="www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Privacy Policy
                  </a>{" "}
                  and
                  <a
                    href="www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Cookies Policy
                  </a>
                  .
                </div>
              </div>
            </div>

            <div className={styles.submitButton}>
              <button type="submit" disabled={formik.isSubmitting}>
                <h4>Sign Up</h4>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.signInRedirect}>
        <h3>
          Have an account? <Link to="/">Log In</Link>
        </h3>
      </div>
    </div>
  );
}

export default SignUp;
