import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createFollow, deleteFollow } from "../services/followService";

function useFollow() {
  const { user } = useContext(AuthContext);
  const [followState, setFollowState] = useState({});

  const handleFollow = async (targetUserId, isRemoved = false) => {
    try {
      const currentState = followState[targetUserId];
      if(isRemoved) {
				await deleteFollow(targetUserId, user.id);
			} else if (currentState) {
        await deleteFollow(user.id, targetUserId);
      } else {
        await createFollow(user.id, targetUserId);
      }

      setFollowState((prev) => ({
        ...prev,
        [targetUserId]: !currentState,
      }));
    } catch (error) {
      console.error("Error while following/unfollowing:", error);
    }
  };

  return {
    followState,
    setFollowState,
    handleFollow,
  };
}

export { useFollow };
