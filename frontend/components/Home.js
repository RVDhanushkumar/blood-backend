import React from "react";

import Header from "./Header";
import Hero from "./Hero";

export default function Home() {
  return (
    <div className="container">
      {/* <Header /> */}
    
      <div className="graphics">
        <div className="hand"></div>
        <Hero />
        <div className="blood-bag">
          {/* <div className="blood-type">+A</div> */}
          
        </div>
      </div>
      <div className="bottom">
      </div>
    </div>
  );
}
