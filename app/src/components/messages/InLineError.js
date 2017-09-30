import React from "react";
import PropTypes from "prop-types";

const InLineError = ({text}) => <span style={{color: "#f50e0e"}}>{text}</span>;

InLineError.propTypes = {
    text: PropTypes.string.isRequired
};

export default InLineError;