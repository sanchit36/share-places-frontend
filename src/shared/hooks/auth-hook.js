import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token, expirationDate) => {
    setToken(token);
    setUserId(userId);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpirationDate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.expiration));
    }
  }, [login]);

  return { token, userId, login, logout };
};

export default useAuth;
