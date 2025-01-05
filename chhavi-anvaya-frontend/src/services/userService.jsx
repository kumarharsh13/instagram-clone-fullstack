import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL + "users" || "http://localhost:5000/api/users";

const changePassword = async (values) => {
  try {
    const response = await axios.post(`${API_URL}/change_password`, values, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return { success: true, users: response.data };
    } else {
      return { success: false, users: [] };
    }
  } catch (error) {
    console.error("Error fetching chaning password:", error);
    return { success: false, users: [] };
  }
};

const editProfileDetails = async (values) => {
  console.log("Form Data: ", values); // Log to inspect the data

  // Create a FormData object
  const formData = new FormData();
  
  // Append text fields (username, mobile, bio)
  formData.append('username', values.username);
  formData.append('mobile', values.mobile);
  formData.append('bio', values.bio);

  // Append the image if it's present
  if (values.image) {
    formData.append('image', values.image); // 'image' is the file input field name
  }
  try {
    const response = await axios.post(`${API_URL}/edit_profile`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      return { success: true, users: response.data };
    } else {
      return { success: false, users: [] };
    }
  } catch (error) {
    console.error("Error updating profile details:", error);
    return { success: false, users: [] };
  }
};

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

export { searchUser, changePassword, editProfileDetails };
