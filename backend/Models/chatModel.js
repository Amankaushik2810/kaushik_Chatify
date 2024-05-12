const mongoose = require('mongoose');
const chatModel = mongoose.Schema(
    {
        chatName:{
            type:String,
            trim:true 
        },
        isGroupChat: {
            type:Boolean,
            default:false
        },
        users:[ //store user with their  id
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    latestMessage: { //store the latest message of the id of the user
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {  //comtain id of that particular group admin
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" },
  },
  { timestamps: true } //new data is added then new time will be updated
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;