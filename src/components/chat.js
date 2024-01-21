import React from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./chat.css";

class Chat extends React.Component {
  render() {
    return (
      <div className="chat">
        <div className="chat-window" id="chat-window">
          <ul className="messages">
            <li className="msg">
              <span className="msg-span">
                <img src={logo} alt="Logo Image" /> <b>BHAI</b> <br/> 
                Please Fill Out the Form
              </span>
            </li>
          </ul>
        </div>
        <form id="messageForm" autoComplete="off">
          <input type="text" id="msg-input" placeholder="Enter Message" />
          <button id="msg-button" type="submit"><FaArrowAltCircleUp /></button>
        </form>
      </div>
    );
  }
}

export default Chat;
