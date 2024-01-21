import React, { useState, useEffect } from "react";
import SearchForm from "./components/Chat"
import "./styles/App.css";
import "./styles/styles.css";
import "./bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [formData, setFormData] = useState({
    search: "",
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
      console.log(formData);
      try {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var rawData = JSON.stringify(formData)
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
  }
  return (
      <div className="App">
          <SearchForm/>
          <header className="App-header">
              <h1 id="test">React and flask</h1>
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
          <form action="{{ url_for('post_data') }}" onSubmit={handleSubmit} method="post">
              <label>
                  search:
                  <input
                      id={"search"}
                    type="text"
                    name="search"
                    value={formData.search}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="submit">Submit Data</button>
          </form>
          <div id="app">
              {" "}
              {/*These are the files you want to import for react app*/}
          </div>
      </div>
  );
}

export default App;
