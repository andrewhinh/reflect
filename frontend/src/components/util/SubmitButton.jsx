import PropTypes from "prop-types";

function SubmitButton({ onClick, label }) {
  return (
    <button type="submit" onClick={onClick}>
      {label}
    </button>
  );
}

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

SubmitButton.defaultProps = {
  onClick: () => {},
  label: "Submit",
};

export default SubmitButton;
