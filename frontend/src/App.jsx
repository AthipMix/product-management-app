import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {

  return (
    <>
      <div className="card card-border bg-base-100 w-96 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p className="text-3xl font-bold underline">
            Hello Product Management
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
