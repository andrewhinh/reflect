import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import SubmitButton from "../util/SubmitButton.jsx";
import "../../styles/nav/SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const { setToken, setUsername } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl =
      import.meta.env.VITE_API_URL.replace(/\/$/, "") +
      ":" +
      import.meta.env.VITE_API_PORT +
      "/users/me/";
    const signUpUrl = apiUrl + "/signup";
    const tokenUrl = apiUrl + "/token";

    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    if (formDataObj.password !== formDataObj.confirmPassword) {
      setErrorMsg("Passwords do not match"); // Update error message
      return;
    }

    setErrorMsg(""); // Clear any previous error message

    fetch(signUpUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));

    fetch(tokenUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.access_token);
        setUsername(formDataObj.username);
        navigate("/profile/" + formDataObj.username);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" />
        <label>Password</label>
        <input type="password" name="password" />
        <label>Confirm Password</label>
        {errorMsg && <p>{errorMsg}</p>}
        <input type="password" name="confirmPassword" />
        <SubmitButton label="Sign Up" />
      </form>
    </>
  );
}

export default SignUp;
