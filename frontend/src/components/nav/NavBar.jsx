import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "../../styles/nav/NavBar.css";

function NavBar() {
  const { token, username } = useAuth();

  return (
    <nav>
      {token ? (
        <Link to={"/profile/" + username}>My Profile</Link>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
