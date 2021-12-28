import ReactDom from "react-dom";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

const SideDrawer = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );
  return ReactDom.createPortal(content, document.getElementById("drawer-hook"));
};

SideDrawer.prototype = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SideDrawer;
