import axios from "axios";

const API_URL =
  (process.env.REACT_APP_API_URL + "users") || "http://localhost:5000/api/users";

const searchUser = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
			params: { query },
      withCredentials: true,
    });

    if (response.status === 200) {
      return { success: true, users: response.data.users || [] };
    } else {
      return { success: false, users: [] };
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, users: [] };
  }
};

export { searchUser };
