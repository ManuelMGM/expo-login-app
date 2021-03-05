import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";

import Colors from "../../helpers/Colors";

interface IScreenContainerProps {
  backgroundColor?: string;
  children?: any;
  style?: any;
  title?: string;
  leftAction?: React.ReactNode;
  rightComponent?: {
    icon: string;
    color: string;
    size: number;
    onPress: () => any;
  };
}

export default function ScreenContainer(props: IScreenContainerProps) {
  const {
    backgroundColor,
    children,
    style,
    title,
    leftAction,
    rightComponent,
  } = props;

  return (
    <View style={{ flex: 1 }}>
      {!!title && (
        <Header
          leftComponent={leftAction ?? undefined}
          centerComponent={{
            text: title,
            style: { color: "#fff", fontSize: 18 },
          }}
          rightComponent={rightComponent ?? undefined}
          barStyle="light-content"
        />
      )}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: backgroundColor || Colors.background,
          ...style,
        }}
      >
        {children}
      </View>
    </View>
  );
}
