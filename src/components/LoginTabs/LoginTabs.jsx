import { useNavigate } from "react-router-dom";
import "./LoginTabs.css";

const LoginTabs = (props) => {
  const navigate = useNavigate();

  return (
    <div id="button-holder">
      <button
        style={{ marginRight: "auto" }}
        onClick={() => {
          navigate("/login");
        }}
        className={props.selected === "login" ? "active" : "inactive"}
      >
        Log In
      </button>
      <div id="spacer" style={{ width: "100%", borderBottom: "2px solid black" }}></div>
      <button
        style={{ marginLeft: "auto" }}
        onClick={() => {
          navigate("/signup");
        }}
        className={props.selected === "signup" ? "active" : "inactive"}
      >
        Sign Up
      </button>
    </div>
  );
};

export default LoginTabs;
