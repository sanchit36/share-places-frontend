import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';
import { Box, useColorModeValue } from '@chakra-ui/react';

const ModalOverlay = (props) => {
  const content = (
    <Box
      className={`modal ${props.className}`}
      style={props.style}
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>

        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </Box>
  );

  return ReactDom.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  headerClass: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onSubmit: PropTypes.func,
  contentClass: PropTypes.string,
  children: PropTypes.element,
  footerClass: PropTypes.string,
  footer: PropTypes.element,
};

export default Modal;
