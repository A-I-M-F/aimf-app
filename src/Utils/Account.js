import axios from 'axios';
import {ADMIN_ROLE, MEMBER_ROLE, SUPER_ADMIN_ROLE} from './Constants';

export const isSuperAdmin = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === SUPER_ADMIN_ROLE);
  }
  return false;
};

export const isAdmin = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === ADMIN_ROLE);
  }
  return false;
};

export const isMember = (user) => {
  if (user && user.roles) {
    return !!user.roles.find((role) => role.name === MEMBER_ROLE);
  }
  return false;
};

export const isAuthorized = (user) => {
  return isSuperAdmin(user) || isAdmin(user) || isMember(user);
};

export const navigate = (
  account,
  navigation,
  defaultNavigation = 'Login',
  youtube = false,
) => {
  if (account.user && account.access_token) {
    axios.defaults.headers.Authorization = `Bearer ${account.access_token}`;

    if (isAdmin(account.user) || isSuperAdmin(account.user)) {
      navigation.navigate(
        youtube
          ? 'adminUserWithYoutubeLiveTabNavigator'
          : 'adminUserTabNavigator',
      );
    } else if (isMember(account.user)) {
      navigation.navigate(
        youtube
          ? 'activeUserWithYoutubeLiveTabNavigator'
          : 'activeUserTabNavigator',
      );
    } else {
      navigation.navigate('unActiveUserTabNavigator');
    }
    return;
  }
  navigation.navigate(defaultNavigation);
};
