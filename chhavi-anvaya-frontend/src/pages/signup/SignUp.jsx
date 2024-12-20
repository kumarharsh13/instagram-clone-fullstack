import { Link } from "react-router-dom";
import styles from "../signup/SignUp.module.css";

function SignUp() {
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
          <div className={styles.signUpFormContant}>
            <label htmlFor="">
              <input type="email" placeholder="Email" required />
            </label>
            <label>
              <input type="tel" placeholder="Mobile Number" required />
            </label>
            <label htmlFor="">
              <input type="password" placeholder="Password" required />
            </label>
            <label htmlFor="">
              <input type="text" placeholder="Full Name" required />
            </label>
            <label htmlFor="">
              <input type="text" placeholder="Username" required />
            </label>
          </div>
          <div className={styles.tncDes}>
            <div className={styles.descriptionContactInfo}>
              <div>
                People who use our service may have uploaded your contact
                information to Instagram.
                <a href="www.google.com" target="_blank">
                  Learn More
                </a>
              </div>
            </div>
            <div className={styles.termsAndCondition}>
              <div>
                By signing up, you agree to our{" "}
                <a href="www.google.com" target="_blank">
                  Terms
                </a>
                ,{" "}
                <a href="www.google.com" target="_blank">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="www.google.com" target="_blank">
                  Cookies Policy
                </a>
                .
              </div>
            </div>
          </div>
					<div className={styles.submitButton}>
						<label htmlFor="">
							<button type="submit"><h4>Sign Up</h4></button>
						</label>
					</div>
        </div>
      </div>
      <div className={styles.signInRedirect}>
        <h3>
          Have an account?{" "}
          <Link to="/" >
            Log In
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default SignUp;
