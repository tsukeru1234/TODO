import { useState } from "react";
import Button from "../components/Buttons/Button";

const AccPage = () => {
  const [sing, setSing] = useState<boolean>(true);
  return (
    <div className="center">
      <div className="auth-main-block">
        <nav className="auth-buttons-bg">
          <div className="auth-buttons">
            <button
              className={`sings-button ${sing ? "active-txt" : "inactive-txt"}`}
              onClick={() => setSing(true)}
            >
              <span>SIGN IN</span>
            </button>
            <button
              className={`sings-button ${!sing ? "active-txt" : "inactive-txt"}`}
              onClick={() => setSing(false)}
            >
              <span>SIGN UP</span>
            </button>
          </div>
          <div
            className={`active-bg ${sing ? "sing-in-active" : "sing-up-active"}`}
          ></div>
        </nav>
        <div className={`sing-box ${sing ? "sing-in-box" : "sing-up-box"}`}>
          <label>
            Enter acc login:
            <input type="text" placeholder="LOGIN" />
          </label>
          <label>
            Enter acc password:
            <input type="text" placeholder="PASSWORD" />
          </label>
          {!sing && (
            <label className="auth-mode-toggle">
              Confirm password:
              <input type="text" placeholder="PASSWORD" />
            </label>
          )}
          <div className="sing-buttons auth-mode-toggle" key={sing ? "signin" : "signup"}>
            <Button type="button">
              <span>{sing ? "SIGN IN" : "SIGN UP"}</span>
            </Button>
            <div className="back-button">
              <Button type="button">
                <span>BACK</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccPage;
