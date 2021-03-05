import React from "react";
import { View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-navigation";

import Colors from "../../helpers/Colors";

interface ISafeAreaViewProps {
  topColor?: string; // iOS
  bottomColor?: string; //iOS
  children?: any;
  safeTopArea?: "always" | "never";
  safeBottomArea?: "always" | "never";
}

export default function SafeAreaView(props: ISafeAreaViewProps) {
  const {
    safeTopArea,
    topColor,
    safeBottomArea,
    bottomColor,
    children,
  } = props;

  return (
    <>
      <RNSafeAreaView
        style={{
          backgroundColor: topColor || Colors.background,
        }}
        forceInset={{ top: safeTopArea || "always", bottom: "never" }}
      />
      <RNSafeAreaView
        style={{
          backgroundColor: bottomColor || Colors.background,
          flexGrow: 1,
        }}
        forceInset={{ top: "never", bottom: safeBottomArea || "never" }}
      >
        <View style={{ flex: 1 }}>{children}</View>
      </RNSafeAreaView>
    </>
  );
}
