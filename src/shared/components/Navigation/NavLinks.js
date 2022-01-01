import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../content/auth-context';
import Button from '../FormElements/Button/Button';

import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`} exact>
            MY PLACES
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to='/places/new' exact>
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='/auth' exact>
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button inverse onClick={auth.logout}>
            LOGOUT
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
