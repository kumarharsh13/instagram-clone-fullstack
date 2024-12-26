import axios from "axios";

const API_URL =
  (process.env.REACT_APP_API_URL + "auth") || "http://localhost:5000/api/auth";

const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during sign-up", error);
    throw error;
  }
};

const signIn = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during sign-in", error);
    throw error;
  }
};

export { signUp, signIn };
