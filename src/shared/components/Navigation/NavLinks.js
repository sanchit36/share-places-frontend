import { useContext } from 'react';
import { NavLink as RRDNavLink } from 'react-router-dom';
import { Link, useColorModeValue, Flex } from '@chakra-ui/react';
import { AuthContext } from '../../content/auth-context';

const NavLink = ({ children, ...rest }) => (
  <Link
    as={RRDNavLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to='/'
    {...rest}
  >
    {children}
  </Link>
);

const NavLinks = ({ onClose }) => {
  const auth = useContext(AuthContext);

  return (
    <Flex as={'nav'} spacing={4} flexDirection={{ base: 'column', md: 'row' }}>
      <NavLink to='/' exact onClick={onClose}>
        ALL USERS
      </NavLink>
      {auth.isLoggedIn ? (
        <>
          <NavLink to={`/${auth.userId}/places`} exact onClick={onClose}>
            MY PLACES
          </NavLink>
          <NavLink to='/places/new' exact onClose={onClose}>
            ADD PLACE
          </NavLink>
        </>
      ) : (
        <NavLink to='/auth' exact onClose={onClose}>
          LOGIN/SIGN UP
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink to='/' onClick={auth.logout}>
          LOGOUT
        </NavLink>
      )}
    </Flex>
  );
};

export default NavLinks;
