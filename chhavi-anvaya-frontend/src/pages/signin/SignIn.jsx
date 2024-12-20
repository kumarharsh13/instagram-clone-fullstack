import { Link } from "react-router-dom";
import styles from "../signin/SignIn.module.css";

function SignIn() {
  return (
    <div className={styles.signIn}>
      <div className={styles.signInFormDescription}>
        <div className={styles.logoNameDetail}>
          <div className={styles.logo}>
            <h1>ChhaviAnvaya</h1>
          </div>
        </div>
        <div className={styles.signInForm}>
          <div className={styles.signInFormContant}>
            <label htmlFor="">
              <input type="email" placeholder="Email" required />
            </label>
            <label htmlFor="">
              <input type="password" placeholder="Password" required />
            </label>
          </div>
          <div className={styles.submitButton}>
            <label htmlFor="">
              <button type="submit">
                <h4>Sign In</h4>
              </button>
            </label>
          </div>
        </div>
      </div>
      <div className={styles.signInRedirect}>
        <h3>
          Don't have an account?{" "}
          <Link to="/signUp" >
            Sign Up
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default SignIn;
