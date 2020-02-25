import React, { createContext, useState, useEffect, useContext } from 'react';
import { subscribe, loginWithProvider } from 'firebase';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const successfulAuth = user => {
    setIsAuthenticated(true);
    setUser(user);
    setLoading(false);
  };

  const unsuccessfulAuth = () => {
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    return subscribe(successfulAuth, unsuccessfulAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated }} >
      {children}
    </AuthContext.Provider>
  );


};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};



export const withSession = Component => {
  return function WithSession(props) {
    const loading = useAuthLoading();
    const isAuthenticated = useIsAuthenticated();

    if(!loading && !isAuthenticated) {
      loginWithProvider();
      return null;
    }

    if(loading) {
      return <h1>Loading</h1>;
    }

    return <Component {...props} />;
  };
};

export const useUser = () => {
  const { user } = useContext(AuthContext);
  return user;
};

export const useIsAuthenticated = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated;
};

export const useAuthLoading = () => {
  const { loading } = useContext(AuthContext);
  return loading;
};
