const mongoose = require('mongoose');
const messageSchema = mongoose.Schema(
  {
    sender: { 
        type: mongoose.Schema.Types.ObjectId, //store the sender id
         ref: "User"  //referance to the user model
        },

    content: {
        type: String,  
        trim: true 
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId, //
        ref: "Chat" 
    },
    readBy: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" }],
  },
  { timestamps: true } //update the timestamp
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;