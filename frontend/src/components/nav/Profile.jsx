import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import SubmitButton from "../util/SubmitButton";
import "../../styles/nav/Profile.css";

function Profile() {
  const { token, username, setUsername } = useAuth();
  const [email, setEmail] = useState("");

  const apiUrl =
    import.meta.env.VITE_API_URL.replace(/\/$/, "") +
    ":" +
    import.meta.env.VITE_API_PORT +
    "/users/me";
  const updateUsernameUrl = apiUrl + "/username";
  const updateEmailUrl = apiUrl + "/email";
  const updatePasswordUrl = apiUrl + "/password";

  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  useEffect(() => {
    if (token) {
      fetch(apiUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUsername(data.username);
          setEmail(data.email);
        })
        .catch((error) => console.log(error));
    }
  }, [apiUrl, token, setUsername]);

  const handleUpdateUsername = () => {
    if (token) {
      const formData = new FormData();
      formData.append("username", username);

      fetch(updateUsernameUrl, {
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => setUsernameErrorMsg(error));
    }
  };

  const handleUpdateEmail = () => {
    if (token) {
      const formData = new FormData();
      formData.append("email", email);

      fetch(updateEmailUrl, {
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => setEmailErrorMsg(error));
    }
  };

  const handleUpdatePassword = (password) => {
    if (token) {
      const formData = new FormData();
      formData.append("password", password);

      fetch(updatePasswordUrl, {
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => setPasswordErrorMsg(error));
    }
  };

  return (
    <>
      {token ? (
        <>
          <h1>Your Profile</h1>
          <div className="form-coll">
            <form>
              <label htmlFor="username">Your username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameErrorMsg && <p>{usernameErrorMsg}</p>}
              <SubmitButton onClick={handleUpdateUsername}>
                Update Username
              </SubmitButton>
            </form>
            <form>
              <label htmlFor="email">Your email:</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErrorMsg && <p>{emailErrorMsg}</p>}
              <SubmitButton onClick={handleUpdateEmail}>
                Update Email
              </SubmitButton>
            </form>
            <form>
              <label htmlFor="password">Your password:</label>
              <input id="password" type="password" />
              <label htmlFor="confirmPassword">Confirm password:</label>
              <input id="confirmPassword" type="password" />
              {passwordErrorMsg && <p>{passwordErrorMsg}</p>}
              <SubmitButton onClick={handleUpdatePassword}>
                Update Password
              </SubmitButton>
            </form>
          </div>
        </>
      ) : (
        <h1>Login or sign up to view your stats!</h1>
      )}
    </>
  );
}

export default Profile;
