import PropTypes from "prop-types";

const Accordion = ({ title, description, isOpen }) => {
  return (
    <details open={isOpen}>
      <summary>{title}</summary>
      <p>{description}</p>
    </details>
  );
};
Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired, // description can be any renderable React node
  isOpen: PropTypes.bool, // isOpen is optional
};

Accordion.defaultProps = {
  isOpen: false, // Default value for isOpen is false (accordion details will be closed by default)
};

export default Accordion;
