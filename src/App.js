import React from "react";
import ShoppingList from "./ShoppingList.js";
import "./styles/App.css";
import "./styles/styles.css";
import "./bootstrap/dist/css/bootstrap.min.css";
import { BsChevronCompactDown } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { LuClipboardCheck } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import Chat from "./components/chat.js";

function App() {
  const scroll = (e) => {
    document.getElementById("main").scrollIntoView();
  };
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row header">
          <div className="col-md-6 col-xs-12">
            <h1 id="title">BHAI</h1>
            <h3 id="subtitle">(Budget Helper AI)</h3>
          </div>
          <div className="col-md-6 col-xs-12">
            <h3 className="sub">Your Personal Finance Bro</h3>
            <LuClipboardList className="icon1" />
            <FaArrowRightLong className="icon2" />
            <LuClipboardCheck className="icon3" />
          </div>
        </div>
        <div className="row transition">
          <a href="#" onClick={scroll}>
            <div className="col-12">
              <BsChevronCompactDown />
            </div>
          </a>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row" id='main'>
          <div className="col-md-6 col-xs-12" id='left'>
          </div>
          <div className="col-md-6 col-xs-12" id='right'>
            <Chat/>
          </div>
        </div>
      </div>

      <div>
        <ShoppingList />
      </div>
    </div>
  );
}

export default App;
