import React from "react";
import { StatusBar } from "expo-status-bar";

import SafeAreaView from "./src/components/SafeAreaView";
import MainNavigation from "./src/navigation/MainNavigation";

import Colors from "./src/helpers/Colors";

export default function App() {
  return (
    <SafeAreaView topColor={Colors.primary}>
      <StatusBar backgroundColor={Colors.background} style="dark" />
      <MainNavigation />
    </SafeAreaView>
  );
}
