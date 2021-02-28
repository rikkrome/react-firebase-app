// import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PasswordReset from '../pages/PasswordReset';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

interface routeTypes {
  name: string,
  path: string
  action?: string;
}
export interface PathsTypes {
  public: {
    brand: routeTypes;
    routes: routeTypes[];
  },
  private: {
    brand: routeTypes;
    routes: Array<routeTypes>;
  },
  profileDropdown: {sectionHeader: string, paths: routeTypes[]}[];
}

export const Paths: PathsTypes = {
  public: {
    brand: {
      name: 'LLMS',
      path: '/',
    },
    routes: [
      {
        name: 'Login',
        path: '/login',
      },
    ],
  },
  private: {
    brand: {
      name: 'LLMS',
      path: '/dashboard',
    },
    routes: [
    ],
  },
  profileDropdown: [
    {
      sectionHeader: 'Account',
      paths: [
        {
          name: 'Settings',
          path: '/settings',
        },
      ],
    },
    {
      sectionHeader: '',
      paths: [
        {
          name: 'Sign Out',
          path: '',
          action: 'signOut',
        },
      ],
    },
  ],
};

export const Routes = {
  public: [
    {
      key: 'home',
      name: 'Home',
      path: '/',
      Component: Login,
    },
    {
      key: 'login',
      name: 'Sign In',
      path: '/login',
      Component: Login,
    },
    {
      key: 'signup',
      name: 'Sign Up',
      path: '/signup',
      Component: SignUp,
    },
    {
      key: 'password-reset',
      name: 'Password Reset',
      path: '/password-reset',
      Component: PasswordReset,
    },
  ],
  private: [
    {
      key: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      Component: Dashboard,
    },
    {
      key: 'about',
      name: 'About',
      path: '/about',
      Component: About,
    },
    {
      key: 'profile',
      name: 'Profile',
      path: '/profile',
      Component: Profile,
    },
    {
      key: 'settings',
      name: 'Settings',
      path: '/settings',
      Component: Settings,
    },
  ],
};
