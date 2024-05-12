import React from 'react'
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../context/ChatProvider";
import MyChat from '../components/MyChat';
import ChatBox from '../components/ChatBox';
const Chats = () => {
  const { user } = ChatState();
  return (
    <div style={{width: "100%"}}>
      {user && <SideDrawer/>}
      <box>
        {user && <MyChat />}
        {user && <ChatBox />}
      </box>
    </div>
  )
}

export default Chats