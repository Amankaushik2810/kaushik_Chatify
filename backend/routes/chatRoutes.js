const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat); //only login user can move to this routes
router.route("/").get(protect, fetchChats); //fetch data for that particular user
router.route("/group").post(protect, createGroupChat); //create group chat
router.route("/rename").put(protect, renameGroup); //rename  or update group chat
router.route("/groupremove").put(protect, removeFromGroup);  //remove someone from the group or leave the group
router.route("/groupadd").put(protect, addToGroup); //add some one to the group

module.exports = router;
