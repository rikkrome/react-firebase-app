import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from '../../providers/Store';
import useAuthActions from '../../providers/Auth/useAuthActions';
import BrandIcon from '../../assets/icons/logo.svg';
import Avatar from '../Avatar';
import {PathsTypes} from '../../configs/router.config';

const HeaderMenu = ({paths}: {paths: PathsTypes}) => {
  const {profileDropdown} = paths || {};
  const auth = useSelector((state: any) => state.auth);
  const authActions = useAuthActions();
  const profile = useSelector((state: any) => state.profile);

  const getKey = (index: number) => {
    return `${index}-${Math.random()}`;
  };

  const linksArray = useMemo(() => {
    if (auth.isAuthorized && paths && paths.private && paths.private.routes) {
      return paths.private.routes;
    }
    if (paths && paths.public && paths.public.routes) {
      return paths.public.routes;
    }
    return null;
  }, [auth.isAuthorized, paths]);

  const Brand = useMemo(() => {
    if (auth.isAuthorized && paths && paths.private && paths.private.brand) {
      return paths.private.brand;
    }
    if (paths && paths.public && paths.public.brand) {
      return paths.public.brand;
    }
    return null;
  }, [auth.isAuthorized, paths]);

  const signOut = () => {
    authActions.signOut();
  };

  const profileActions = (action: string | undefined) => {
    try {
      switch (action) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    } catch (error) {
      console.trace('profileActions ', error);
    }
  };

  const Profile = auth.isAuthorized ? (
    <div className="nav-item dropdown order-sm-0 order-md-0 order-lg-1">
      <div
        className="nav-link "
        id="navbarProfileDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <Avatar uri={profile.photoUrl} size={30} />
      </div>
      <div className="dropdown-menu" style={{right: 16}} aria-labelledby="navbarProfileDropdown">
        {profileDropdown && Array.isArray(profileDropdown)
          ? profileDropdown.map((item, index) => {
            const divider = profileDropdown.length - 1 > index ? <div className="dropdown-divider" /> : null;
            return (
              <div key={getKey(index)}>
                <h6 className="ml-3 mt-2">{item.sectionHeader}</h6>
                {item.paths && Array.isArray(item.paths)
                  ? item.paths.map((pathData, index2) => {
                    return (
                      <Link
                        key={getKey(index2)}
                        to={pathData.path}
                        onClick={() => profileActions(pathData.action)}
                        className="dropdown-item"
                      >
                        {pathData.name}
                      </Link>
                    );
                  })
                  : null}
                {divider}
              </div>
            );
          })
          : null}
      </div>
    </div>
  ) : null;

  const MobileButton = linksArray && linksArray.length ? (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  ) : null;

  const BrandSection = (
    <div className="navbar-brand">
      <Link to={Brand ? Brand.path : ''}>
        <img src={BrandIcon} width="30" height="30" alt="" loading="lazy" />
      </Link>
    </div>
  );

  const Links = linksArray ? (
    <div className="collapse navbar-collapse justify-content-end order-sm-1 order-md-1 order-lg-0" id="navbarNav">
      <ul className="navbar-nav">
        {linksArray.map((item, index) => {
          const {path, name} = item || {};
          return (
            <li key={getKey(index)} className="nav-item active">
              <Link to={path} className="nav-link">
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container justify-content-between">
        {MobileButton}
        {BrandSection}
        {Profile}
        {Links}
      </div>
    </nav>
  );
};

export default HeaderMenu;
