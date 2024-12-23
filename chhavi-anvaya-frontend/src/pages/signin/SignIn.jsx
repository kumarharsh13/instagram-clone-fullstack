import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../../services/authService';
import styles from '../signin/SignIn.module.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function SignIn() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await signIn(values);
        if (response.success) {
          // Store JWT token in localStorage for session management
          localStorage.setItem('token', response.token);
          navigate('/homepage');
        } else {
          alert(response.message);
        }
      } catch (error) {
        alert('Something went wrong! Please try again.');
      }
    },
  });

  return (
    <div className={styles.signIn}>
      <div className={styles.signInFormDescription}>
        <div className={styles.logoNameDetail}>
          <div className={styles.logo}>
            <h1>ChhaviAnvaya</h1>
          </div>
        </div>
        <div className={styles.signInForm}>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.signInFormContant}>
              <label htmlFor="email">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={
                    formik.touched.email && formik.errors.email ? 'error' : ''
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error-message">{formik.errors.email}</div>
                )}
              </label>

              <label htmlFor="password">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={
                    formik.touched.password && formik.errors.password
                      ? 'error'
                      : ''
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error-message">{formik.errors.password}</div>
                )}
              </label>
            </div>
            <div className={styles.submitButton}>
              <button type="submit" disabled={formik.isSubmitting}>
                <h4>Sign In</h4>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.signInRedirect}>
        <h3>
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </h3>
      </div>
    </div>
  );
}

export default SignIn;
