/* eslint-disable react/jsx-props-no-spreading */
import './App.scss';
import 'bootstrap';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HeaderMenu from './components/HeaderMenu';
import StoreProvider, { useSelector } from './providers/Store';
import { Routes, Paths } from './configs/router.config';
import BrandIcon from './assets/icons/logo.svg';
import useLifecycle from './providers/Lifecycle/useLifecycle';
import SystemAlert from './providers/System/systemAlert';

function PrivateRoute({ children, ...rest }: { children: JSX.Element }) {
  const { isAuthorized } = useSelector((state: any) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
      }
    />
  );
}

function Load({ children }: { children: JSX.Element }) {
  const [initialized] = useLifecycle();
  return initialized ? (
    children
  ) : (
      <div className="App d-flex flex-column justify-content-center align-items-center">
        <img src={BrandIcon} className="rounded-circle" alt="defaultAvatar" style={{ width: 100, height: 100 }} />
        <div className="spinner-border text-primary mt-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
}

function App() {
  return (
    <Router>
      <StoreProvider>
        <Load>
          <div className="App d-flex flex-column">
            <HeaderMenu paths={Paths} />
            <Switch>
              {Routes.public.map((item) => {
                const { path, Component, key } = item || {};
                return (
                  <Route key={key} exact path={path}>
                    <Component />
                  </Route>
                );
              })}
              <PrivateRoute>
                <div key="private-route-jsx-element">
                  {Routes.private.map((item) => {
                    const { path, Component, key } = item || {};
                    return (
                      <Route key={key} exact path={path}>
                        <Component />
                      </Route>
                    );
                  })}
                </div>
              </PrivateRoute>
            </Switch>
          </div>
        </Load>
        <SystemAlert />
      </StoreProvider>
    </Router>
  );
}

export default App;
