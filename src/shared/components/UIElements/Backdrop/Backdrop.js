import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./Backdrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

Backdrop.prototype = {
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;
