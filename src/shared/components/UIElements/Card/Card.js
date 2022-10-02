import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

const Card = ({ children, ...props }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      maxW='2xl'
      borderWidth='1px'
      rounded='lg'
      shadow='lg'
      position='relative'
      overflow='hidden'
      m='auto'
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
