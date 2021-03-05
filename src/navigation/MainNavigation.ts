import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";

// Screens
import Loading from "./loading";
import Login from "./login";
import Info from "./info";

const appStack = createStackNavigator(
  {
    Loading: Loading,
    Login: Login,
    Info: Info,
  },
  {
    headerMode: "none",
    initialRouteName: "Loading",
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  }
);

const MainNavigation = createAppContainer(appStack);

export default MainNavigation;
