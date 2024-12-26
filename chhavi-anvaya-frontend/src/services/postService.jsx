import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL + "posts" || "http://localhost:5000/api/posts";

const create_post = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create_post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while posting", error);
    throw error;
  }
};

const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_posts`, {
      withCredentials: true,
    });
    console.log(JSON.stringify(response));
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const getMyPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_my_posts`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const getFollowingUserPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_following_posts`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export { create_post, getPosts, getMyPosts, getFollowingUserPosts };
