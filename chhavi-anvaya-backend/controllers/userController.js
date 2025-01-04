const { User } = require("../models");
const upload = require("../middleware/profile_image");
const path = require("path");
const { Op } = require("sequelize");

const getSearchUser = async (req, res) => {
	const query = req.query.query
  
	console.debug("Helo" + query)
  try {
    const users = await await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${query}%` } },
          { name: { [Op.iLike]: `%${query}%` } },
        ],
      },
      attributes: ["id", "username", "name", "profile_url"], 
      limit: 6, 
    });
    
    res.json({ success: true, users });
  } catch (error) {
    console.error("Error searching users:", error);
    res.json({ success: false, users: [] });
  }
}

module.exports = { getSearchUser }