import React from "react";


export default function Hero() {
  const navigateToRegister = () => {
    window.location.href = "/register";
  };

  const navigateToUserTable = () => {
    window.location.href = "/usertable";
  };

  return (
    <div className="hero">
      <h1 className="title">BLOOD DONATION</h1>
      <h2 className="subtitle">Saves Lives</h2>
      <p className="description">
        Together, we're stronger. Donate blood and save lives. Every drop counts!
      </p>
      <div className="buttons">
        <button className="donate-btn" onClick={navigateToRegister}>Donate</button>
        <button className="sign-in-btn" onClick={navigateToUserTable}>Request Blood</button>
      </div>
    </div>
  );
}
