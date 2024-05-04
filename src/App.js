import { useState } from "react";
import React from "react";
import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
  const responseGoogle = (response) => {
    console.log(response);
    const { code } = response;
    axios
      .post("/api/create-tokens", { code })
      .then((response) => {
        console.log(response.data);
        setSignedIn(true);
      })
      .catch((error) => {
        console.log(error(error.message));
      });
  };

  const responseError = (error) => {
    console.log(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* console.log(summary, description, location, startDateTime, endDateTime) */
    axios
      .post("/api/create-event", {
        summary,
        description,
        location,
        startDateTime,
        endDateTime,
      })
      .then((response) => {
        console.log(response.data);
        setSignedIn(true);
      })
      .catch((error) => {
        console.log(error(error.message));
      });
  };

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const [signedIn, setSignedIn] = useState(false);

  return (
    <GoogleOAuthProvider clientId="52854098109-bvrkrv1iv699ar99su4fonq2ajps3aov.apps.googleusercontent.com">
      <div>
        <div className="App">
          <h1>GOOGLE CALENDAR API</h1>
        </div>
        {!signedIn ? (
          <div>
            <GoogleLogin
              buttonText="Sign in & Authorize Calendar"
              onSuccess={responseGoogle}
              onFailure={responseError}
              cookiePolicy={"single_host_origin"}
              responseType="code"
              accessType="offline"
              scope="openid email profile https://www.googleapis.com/auth/calendar"
            />
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}></form>
            <label htmlFor="summary">Summary</label>
            <br />
            <input
              type="test"
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <br />
            <input
              type="test"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <input
              type="test"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <br />
            <input
              type="datetime-local"
              id="startDateTime"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
            />
            <br />
            <input
              type="datetime-local"
              id="endDateTime"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
            />
            <br />
            <button type="submit">Create Event</button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
