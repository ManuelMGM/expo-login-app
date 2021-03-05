import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button as RNEButton, ButtonProps } from "react-native-elements";

import Colors from "../../helpers/Colors";

interface IButtonProps extends ButtonProps {
  color?: string;
  outerContainerStyle?: any;
}

export default class Button extends Component<IButtonProps> {
  render() {
    const { type } = this.props;

    const backgroundColor =
      !type || type === "solid"
        ? this.props.color || Colors.button.default
        : "white";
    const color =
      !type || type === "solid"
        ? "white"
        : this.props.color || Colors.button.default;
    const border =
      type === "outline" ? { borderColor: color, borderWidth: 1 } : {};

    return (
      <View style={this.props.outerContainerStyle}>
        <RNEButton
          {...this.props}
          buttonStyle={[
            styles.buttonStyle,
            { backgroundColor, ...border },
            this.props.buttonStyle,
          ]}
          containerStyle={[styles.containerStyle, this.props.containerStyle]}
          titleStyle={[{ color }, this.props.titleStyle]}
          loadingProps={{ color }}
        />
      </View>
    );
  }
}

const borderRadius = 8;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius,
    padding: 10,
    margin: 8,
  },
  containerStyle: {
    borderRadius,
    overflow: "hidden",
  },
});
