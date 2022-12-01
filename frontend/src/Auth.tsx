import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";

const authContext = createContext<{ user?: any }>({});

function useAuth() {
  return useContext(authContext);
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb: Function) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: Function) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function useProviderAuth() {
  const [user, setUser] = useState<Record<string, any>>();

  const signin = (cb: Function) => {
    return fakeAuth.signin(() => {
      setUser({});
      cb();
    });
  };

  const signout = (cb: Function) => {
    return fakeAuth.signout(() => {
      setUser({});
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

export const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const AuthRoute: React.FC<{ children: React.ReactElement | null }> = ({
  children,
}) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
