import React from "react";
import ShoppingList from "./ShoppingList.js";
import "./styles/App.css";
import "./styles/styles.css";
import { FaArrowAltCircleUp } from "react-icons/fa";
import "./bootstrap/dist/css/bootstrap.min.css";
import { BsChevronCompactDown } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { LuClipboardCheck } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import "./styles/signin.css";
import "./styles/chat.css";
import logo from "./assets/logo.png";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, orderBy, query, limit, serverTimestamp, addDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from "react";
import OpenAI from "openai";
//require("dotenv").config();

const firebaseConfig = {
  apiKey: "AIzaSyB1YXKGdH8_YwfG0woNxIHyeShyUlJkDQQ",
  authDomain: "bhai-c8d92.firebaseapp.com",
  projectId: "bhai-c8d92",
  storageBucket: "bhai-c8d92.appspot.com",
  messagingSenderId: "218628189116",
  appId: "1:218628189116:web:187e68948931d3a56159b9",
  measurementId: "G-MGVTNLXY13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();
const openai = new OpenAI();//process.env.OPENAI_KEY

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  return (
    <button id="Login" onClick={signInWithGoogle}>Sign In</button>
  );
}

function Chat() {

  const messagesRef = collection(firestore, auth.currentUser.email);
  const q = query(messagesRef, orderBy("createdAt"), limit(100));
  const [messages] = useCollectionData(q, {idField: 'id'});
  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const {displayName, photoURL} = auth.currentUser;
    await addDoc( messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: displayName,
      url: photoURL
    });
    bhaiMessage(formValue);

    setFormValue('');
    document.getElementById("messageForm").scrollIntoView({behavior: "smooth"});
  }

  const bhaiMessage = async(message) => {

    const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "You are a financial budgeting assistant helping individuals find cheaper alternatives to products and good deals."}, {"role": "user","content": {message}}],
      model: "gpt-3.5-turbo",
    });

    const text = completion.choices[0];
    await addDoc( messagesRef, {
      text: text,
      createdAt: serverTimestamp(),
      uid: "BHAI",
      url: logo
    });
  }

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
          {messages && messages.map(msg => <Msg key={msg.id} message={msg} />)}
        </ul>
      </div>
      <form id="messageForm" autoComplete="off" onSubmit={sendMessage}>
        <input type="text" id="msg-input" placeholder="Enter Message" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button id="msg-button" type="submit"><FaArrowAltCircleUp /></button>
      </form>
    </div>
  );
}

function Msg(props) {
  const {text, uid, url} = props.message;
  return (
     <li className="msg">
      <span className="msg-span">
        <img src={url} /> <b>{uid}</b> <br/> 
        {text}
      </span>
    </li>
);
}

function App() {
  const scroll = (e) => {
    document.getElementById("main").scrollIntoView({behavior: "smooth"});
  };
  const [user] = useAuthState(auth);
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
            <ShoppingList />
          </div>
          <div className="col-md-6 col-xs-12" id='right'>
            {user ? <Chat/> : <SignIn auth={auth} provider={provider}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
