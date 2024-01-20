import React, { useState, useEffect } from "react";
import SearchForm from "./components/Chat"
import ShoppingList from "./ShoppingList.js";
import "./styles/App.css";
import "./styles/styles.css";
import "./bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [formData, setFormData] = useState({
    key1: "",
    key2: "",
  });
  const [data, setdata] = useState("");

  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from
    // flask server it will be redirected to proxy

  }, []);
    const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await
              fetch("http://localhost:5000/post_data", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
              });
          if (response.ok) {
              const result = await response.json();
              console.log(result.message);
          } else {
              console.error("Failed to post data");
          }
      } catch (error) {
          console.error("Error:", error);
      }
  }
  return (
      <div className="App">
          <SearchForm/>
          <header className="App-header">
              <h1>React and flask</h1>
              {/* Calling a data from setdata for showing */}
              <p>{data}</p>
          </header>
          <div className="container-fluid">
              <div className="row" id="main">
                  <div className="col-md-6 col-xs-12" id="left">
                      Hello World
                  </div>
                  <div className="col-md-6 col-xs-12" id="right">
                      Hello World
                  </div>
              </div>
          </div>
          <form onSubmit={handleSubmit}>
              <label>
                  Key 1:
                  <input
                    type="text"
                    name="key1"
                    value={formData.key1}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Key 2:
                  <input
                    type="text"
                    name="key2"
                    value={formData.key2}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="submit">Submit Data</button>
          </form>
          <div id="app">
              {" "}
              {/*These are the files you want to import for react app*/}
              <ShoppingList/>
          </div>
      </div>
  );
}

export default App;
