import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

const SideDrawer = ({ children, isOpen, onClose }) => {
  const content = (
    <Drawer placement='left' size='full' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody display='flex' justifyContent='center' alignItems='center'>
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
  return ReactDom.createPortal(content, document.getElementById('drawer-hook'));
};

SideDrawer.prototype = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideDrawer;
