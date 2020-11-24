import "../styles/App.css";
import Navbar from "./Navbar";
import TGTInput from "./TGTInput";
import TGTList from "./TGTList";
import React from "react";
import { useEffect, useState } from "react";
import {
  GoogleLogin,
  GoogleLogout,
  useGoogleLogin,
  useGoogleLogout,
} from "react-google-login";

function App() {
  const [toukouState, setToukouState] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [userName, setUserName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [updateFlag, setUpdateFlag] = useState("OFF");

  const CLIENT_ID =
    "535477566115-nk6dj1hrk0gvsfrmhimmbqgts7f3puqt.apps.googleusercontent.com";
  const login = (response) => {
    if (response.accessToken && response.profileObj) {
      console.log(response);
      setLoginSuccess(true);
      setAccessToken(response.accessToken);
      setGoogleId(response.profileObj.googleId);
      setUserName(response.profileObj.name);
      setImgUrl(response.profileObj.imageUrl);
    }
  };
  const logout = (response) => {
    setLoginSuccess(false);
    setAccessToken("");
  };

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

  function updateFlagChange() {
    console.log("qqqqqq");
    const updateFlag = "ON";
    setUpdateFlag(updateFlag);
  }
    function updatestate() {
    setToukouState(toukouState + 1);
  }
  
  return (
    <div className="App">
      <Navbar />
      <TGTInput updatestate={updatestate} />
      <TGTList toukouState={toukouState} />
      <div>
        {loginSuccess ? (
          <>
            <br />
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            ></GoogleLogout>
            <TGTInput
              userName={userName}
              imgUrl={imgUrl}
              updateFlagChange={updateFlagChange}
            />
            <TGTList />
          </>
        ) : (
          <>
            <br />
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Login"
              onSuccess={login}
              onFailure={handleLoginFailure}
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
