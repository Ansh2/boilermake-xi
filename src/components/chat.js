import React, {useEffect, useState} from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./chat.css";

class Chat extends React.Component {
  handleSubmit = async (e) => {
      e.preventDefault();
      console.log(this.props.formData);
      try {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var rawData = JSON.stringify(this.props.formData)
          const response = await
              fetch("http://localhost:5000/post_data", {
                  method: "POST",
                  body: rawData,
                  headers: myHeaders
              });
          if (response.ok) {
              // const result = await response;
              document.getElementById("test").innerText = (await response.json()).message;
          } else {
              console.error("Failed to post data");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  };
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
        <form action="{{ url_for('post_data') }}" onSubmit={this.handleSubmit} method="post" id="messageForm" autoComplete="off">
          <input type="text" id="msg-input" name="search" placeholder="Enter Message"
                 value={this.props.formData.search}
                 onChange={this.props.handleInputChange}/>
          <button id="msg-button" type="submit"><FaArrowAltCircleUp /></button>
        </form>
      </div>
    );
  }
}

export default Chat;
