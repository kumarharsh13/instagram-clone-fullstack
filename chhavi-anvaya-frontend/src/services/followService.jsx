import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL + "follow" ||
  "http://localhost:5000/api/follow";

const createFollow = async (follower_id, following_id) => {
  try {
    const response = await axios.post(
      `${API_URL}/create_follow`,
      {
        follower_id,
        following_id,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error while posting", error);
    throw error;
  }
};

const getFollowers = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/get_followers`, {
      data: { username },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const getFollowing = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/get_following`, {
      data: { username },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const getFollowSuggestion = async (user_id) => {
  try {
    const response = await axios.get(`${API_URL}/get_follow_suggestion`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// const mutualFollowing = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/get_following_posts`, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw error;
//   }
// };

const deleteFollow = async (follower_id, following_id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete_follow`, {
      data: { follower_id, following_id },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting followers:", error);
    throw error;
  }
};

export {
  getFollowers,
  getFollowing,
  getFollowSuggestion,
  createFollow,
  deleteFollow,
  // mutualFollowing,
};
