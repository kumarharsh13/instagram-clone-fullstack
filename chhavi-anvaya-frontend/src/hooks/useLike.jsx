import { useState } from "react";
import { createLike, deleteLike } from "../services/postService";

function useLike() {
  const [animateHeart, setAnimateHeart] = useState(false);

  const updateLikes = async (isLiked, setIsLiked, setLikes, postId, userId) => {
    try {
      if (isLiked) {
        await deleteLike(postId, userId);
        setLikes((likes) => likes - 1); 
        setIsLiked(false); 
      } else {
        await createLike(postId, userId);
        setLikes((likes) => likes + 1); 
        setIsLiked(true);
        setAnimateHeart(true);
      }

      setTimeout(() => setAnimateHeart(false), 1500);
    } catch (error) {
      console.error("Error liking or disliking post:", error);
    }
  };

  return {
    animateHeart,
    updateLikes,
  };
}

export { useLike };
