import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import * as PropTypes from 'prop-types';
import {Icon} from 'native-base';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../config/icons/selection.json';

import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import KoranScreen from './screens/KoranScreen';
import AddKhatma from './screens/KoranScreen/AddKhatma';
import Khatma from './screens/KoranScreen/Khatma';
import AccountScreen from './screens/AccountScreen';
import UserScreen from './screens/UserScreen';
import UnaccessibleScreen from './screens/UnaccessibleScreen';
import YouTubeScreen from './screens/YouTubeSceen';
import LibraryScreen from './screens/LibraryScreen';
import BookDetails from './screens/LibraryScreen/BookDetails';
import BookReservation from './screens/LibraryScreen/BookReservation';
import MyReservations from './screens/LibraryScreen/MyReservations';
import BookFavoriteList from './screens/LibraryScreen/BookFavoriteList';
import {gray, mainColorButton, white} from './Utils/colors';
import HomeIcon from './Components/icons/navbar/HomeIcon';
import LiveBroadcastIcon from './Components/icons/navbar/LiveBroadcastIcon';
import UserIcon from './Components/icons/navbar/UserIcon';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 45,
    paddingBottom: 14,
    marginBottom: -16,
    borderBottomColor: white,
  },
});

const tabBarOptions = {
  pressOpacity: 0.2,
  style: {
    height: 60,
    backgroundColor: mainColorButton,
  },
  showLabel: false,
};
const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);
// ----------------------------------------------HomeScreen-----------------------------------------------------
const HomeStack = createStackNavigator({
  Timeline: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Accueil',
  tabBarIcon: (tabBarIconProps) => (
    <View
      style={{
        ...styles.icon,
        borderBottomWidth: tabBarIconProps.focused ? 2.5 : 0,
      }}>
      <HomeIcon color={white} />
    </View>
  ),
};

const disableHomeStack = createStackNavigator({
  Timeline: UnaccessibleScreen,
});

disableHomeStack.navigationOptions = {
  tabBarLabel: 'Accueil',
  tabBarIcon: () => (
    <HomeIcon color={gray} />
    // todo change disabled style
  ),
};

// ----------------------------------------------PostWorkflowScreen-----------------------------------------------------
const PostWorkflowStack = createStackNavigator({
  PostWorkflow: PostScreen,
});
const PostWorkflowStackTabBarIcon = ({focused}) => (
  <View
    style={{
      ...styles.icon,
      borderBottomWidth: focused ? 2.5 : 0,
    }}>
    <Icon
      type="AntDesign"
      name="addfile"
      style={{fontSize: 25, marginBottom: -3, color: white}}
    />
  </View>
);
PostWorkflowStackTabBarIcon.propTypes = {
  focused: PropTypes.string.isRequired,
};

PostWorkflowStack.navigationOptions = {
  tabBarLabel: 'Post',
  tabBarIcon: PostWorkflowStackTabBarIcon,
};

// ----------------------------------------------KoranScreen-----------------------------------------------------
const navOptionHandler = () => ({
  header: null,
});

const KoranStack = createStackNavigator({
  KoranTimeLine: {
    screen: KoranScreen,
    navigationOptions: navOptionHandler,
  },
  AddKhatma: {
    screen: AddKhatma,
    navigationOptions: navOptionHandler,
  },
  Khatma: {
    screen: Khatma,
    navigationOptions: navOptionHandler,
  },
});

KoranStack.navigationOptions = {
  tabBarLabel: 'Khetma',
  tabBarIcon: (tabBarIconProps) => (
    <View
      style={{
        ...styles.icon,
        borderBottomWidth: tabBarIconProps.focused ? 2.5 : 0,
      }}>
      <CustomIcon name="coran" size={25} color={white} />
    </View>
  ),
};

// const disableKoranStack = createStackNavigator({
//   Koran: UnaccessibleScreen,
// });
//
// disableKoranStack.navigationOptions = {
//   tabBarLabel: 'Khetma',
//   tabBarIcon: () => (
//     <CustomIcon name="coran" style={{opacity: 0.5}} size={25} color="#000" />
//   ),
// };

// ----------------------------------------------LibraryScreen-----------------------------------------------------

const libraryStack = createStackNavigator({
  LibraryTimeLine: {
    screen: LibraryScreen,
  },
  BookDetails: {
    screen: BookDetails,
  },
  BookReservation: {
    screen: BookReservation,
  },
  BookFavoriteList: {
    screen: BookFavoriteList,
  },
  MyReservations: {
    screen: MyReservations,
  },
});

const libraryStackTabBarIcon = ({focused}) => (
  <View
    style={{
      ...styles.icon,
      borderBottomWidth: focused ? 2.5 : 0,
    }}>
    {' '}
    <Icon type="FontAwesome" name="book" color={white} />
  </View>
);
libraryStackTabBarIcon.propTypes = {
  focused: PropTypes.string.isRequired,
};

libraryStack.navigationOptions = {
  tabBarLabel: 'Bibliothèque',
  tabBarIcon: libraryStackTabBarIcon,
};

const disableLibraryStack = createStackNavigator({
  Timeline: UnaccessibleScreen,
});

disableLibraryStack.navigationOptions = {
  tabBarLabel: 'Bibliothèque',
  tabBarIcon: () => (
    <Icon
      type="FontAwesome"
      name="book"
      color="#000"
      style={{fontSize: 35, marginBottom: -3, opacity: 0.5}}
    />
  ),
};
// ----------------------------------------------YouTubeScreen-----------------------------------------------------
const YouTubeStack = createStackNavigator({
  YouTube: YouTubeScreen,
});

// const YouTubeStackTabBarIcon = ({focused}) => (
//   <Icon
//     type="SimpleLineIcons"
//     name="social-youtube"
//     style={{fontSize: 30, marginBottom: -3}}
//     color={focused ? mainColor : '#ccc'}
//   />
// );
//
// YouTubeStackTabBarIcon.propTypes = {
//   focused: PropTypes.string.isRequired,
// };

YouTubeStack.navigationOptions = {
  tabBarLabel: 'Direct',
  tabBarIcon: (tabBarIconProps) => (
    <View
      style={{
        ...styles.icon,
        borderBottomWidth: tabBarIconProps.focused ? 2.5 : 0,
      }}>
      <LiveBroadcastIcon color={white} />
    </View>
  ),
};

const disableYouTubeStack = createStackNavigator({
  Youtube: UnaccessibleScreen,
});

disableYouTubeStack.navigationOptions = {
  tabBarLabel: 'Direct',
  tabBarIcon: () => <LiveBroadcastIcon color={gray} />,
};

// ----------------------------------------------UserScreen-----------------------------------------------------

const UserStack = createStackNavigator({
  User: UserScreen,
});

const UserStackTabBarIcon = ({focused}) => (
  <View
    style={{
      ...styles.icon,
      borderBottomWidth: focused ? 2.5 : 0,
    }}>
    <Icon
      type="AntDesign"
      name="addusergroup"
      style={{marginBottom: -3, fontSize: 28, color: white}}
    />
  </View>
);
UserStackTabBarIcon.propTypes = {
  focused: PropTypes.string.isRequired,
};
UserStack.navigationOptions = {
  tabBarLabel: 'User',
  tabBarIcon: UserStackTabBarIcon,
};
// ----------------------------------------------AccountScreen-----------------------------------------------------
const AccountStack = createStackNavigator({
  Account: AccountScreen,
});

// const AccountStackTabBarIcon = ({focused}) => (
//   <Icon
//     type="EvilIcons"
//     name="user"
//     color={focused ? mainColor : '#ccc'}
//     style={{fontSize: 35, marginBottom: -3}}
//   />
// );
//
// AccountStackTabBarIcon.propTypes = {
//   focused: PropTypes.string.isRequired,
// };

AccountStack.navigationOptions = {
  tabBarLabel: 'Compte',
  tabBarIcon: (tabBarIconProps) => (
    <View
      style={{
        ...styles.icon,
        borderBottomWidth: tabBarIconProps.focused ? 2.5 : 0,
      }}>
      <UserIcon />
    </View>
  ),
};

// ----------------------------------------------Tab navigators-----------------------------------------------------

export const unActiveUserTabNavigator = createBottomTabNavigator(
  {
    disableHomeStack,
    // todo enable this buttons on the 2.0 version
    // disableKoranStack,
    // disableLibraryStack,
    disableYouTubeStack,
    AccountStack,
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({navigation, defaultHandler}) => {
        if (
          navigation.state.routeName === 'disableHomeStack' ||
          // navigation.state.routeName === 'disableKoranStack' ||
          navigation.state.routeName === 'disableYouTubeStack'
          // navigation.state.routeName === 'disableLibraryStack'
        ) {
          return null;
        }
        defaultHandler();
        return null;
      },
    },
    initialRouteName: 'AccountStack',
    tabBarOptions,
  },
);

export const activeUserTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    // todo enable this buttons on the 2.0 version
    // KoranStack,
    // libraryStack,
    YouTubeStack,
    AccountStack,
  },
  {
    tabBarOptions,
  },
);

export const adminUserTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    // todo enable this buttons on the 2.0 version
    // KoranStack,
    // libraryStack,
    PostWorkflowStack,
    YouTubeStack,
    UserStack,
    AccountStack,
  },
  {
    tabBarOptions,
  },
);

export const adminAssociationTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    // todo enable this buttons on the 2.0 version
    // KoranStack,
    // libraryStack,
    PostWorkflowStack,
    YouTubeStack,
    AccountStack,
  },
  {
    tabBarOptions,
  },
);
