import PropTypes from "prop-types";
import "../../styles/util/Footer.css";

function Footer({ heading, link }) {
  return (
    <footer>
      <div>
        <h3>{heading}</h3>
        <a href={link}>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="Repository Link"
            className="gh-logo"
          />
        </a>
      </div>
      <img
        src="https://storage.googleapis.com/chydlx/codepen/random-gif-generator/giphy-logo.gif"
        alt="Giphy Logo"
        className="giphy-logo"
      />
    </footer>
  );
}

Footer.propTypes = {
  heading: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  heading: "Made by Andrew Hinh",
  link: "https://github.com/andrewhinh/project",
};

export default Footer;
