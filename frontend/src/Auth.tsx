import React, { useContext, createContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { userApi } from "./services";
import { message } from "antd";

export const authContext = createContext<{
  user?: any;
  signin?: (param: { username: string }, cb?: Function) => void;
  signup?: (cb?: Function) => void;
}>({});

function useAuth() {
  return useContext(authContext);
}

const fetchAuth = {
  signin(param?: { username: string }, cb?: Function) {
    userApi(param?.username)
      .then((value) => {
        if (cb) {
          cb(value.data.user);
        }
      })
      .catch((value) => {
        message.error(value.message);
      });
  },
  signout(cb: Function) {
    setTimeout(cb, 100);
  },
};

function useProviderAuth() {
  const [user, setUser] = useState<Record<string, any> | undefined>();

  const signin = (param?: { username: string }, cb?: Function) => {
    return fetchAuth.signin(
      param,
      (user: React.SetStateAction<Record<string, any> | undefined>) => {
        setUser(user);
        if (cb) {
          cb(user);
        }
      }
    );
  };

  const signout = (cb?: Function) => {
    return fetchAuth.signout(() => {
      setUser(undefined);
      if (cb) {
        cb(user);
      }
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

  useEffect(() => {
    if (auth && !auth.user) {
      auth.signin();
    }
  }, [auth.user]);

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
