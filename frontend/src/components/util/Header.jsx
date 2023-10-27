import PropTypes from "prop-types";
import "../../styles/util/Header.css";

function Header({ heading }) {
  return (
    <header>
      <h1>{heading}</h1>
    </header>
  );
}

Header.propTypes = {
  heading: PropTypes.string.isRequired,
};

Header.defaultProps = {
  heading: "Project",
};

export default Header;
