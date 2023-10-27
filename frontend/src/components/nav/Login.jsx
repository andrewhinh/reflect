import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import SubmitButton from "../util/SubmitButton.jsx";
import "../../styles/nav/Login.css";

function Login() {
  const navigate = useNavigate();
  const { setToken, setUsername } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl =
      import.meta.env.VITE_API_URL.replace(/\/$/, "") +
      ":" +
      import.meta.env.VITE_API_PORT +
      "/users/me/token";

    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    fetch(apiUrl, {
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" />
        <label>Password</label>
        <input type="password" name="password" />
        <SubmitButton label="Login" />
      </form>
    </>
  );
}

export default Login;
