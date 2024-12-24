import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      axios
        .get(`${API_URL}/verify_token`, { withCredentials: true })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((error) => {
          console.log("Token verification failed.", error);
        });
    }
  }, []);

  const setAuthUser = (user) => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
    document.cookie = "token=; Max-Age=0; path=/";
  };

  return (
    <AuthContext.Provider value={{ user, setAuthUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
