import React, { Component } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Input as RNEInput, InputProps } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../helpers/Colors";

interface IInputProps extends InputProps {
  password?: boolean;
}
export default class Input extends Component<IInputProps> {
  state = { revealPassword: true };

  componentDidMount() {
    if (this.props.password) {
      this.setState({ revealPassword: false });
    }
  }

  revealPasswordButton = (color) => {
    if (this.props.password) {
      const { revealPassword } = this.state;

      return (
        <TouchableWithoutFeedback
          onPressIn={() => this.setState({ revealPassword: !revealPassword })}
          onPressOut={() => this.setState({ revealPassword: !revealPassword })}
        >
          <Ionicons
            name={`md-eye${revealPassword ? "-off" : ""}`}
            color={color}
            size={22}
            style={{ marginRight: 5 }}
          />
        </TouchableWithoutFeedback>
      );
    }
  };

  render() {
    const inputColor = Colors.button.default;

    return (
      <RNEInput
        {...this.props}
        inputContainerStyle={[
          { borderColor: inputColor, borderBottomWidth: 1 },
        ]}
        inputStyle={[styles.inputStyle, { color: "black" }]}
        labelStyle={[styles.labelStyle, { color: inputColor }]}
        secureTextEntry={!this.state.revealPassword}
        rightIcon={
          this.props.password
            ? this.revealPasswordButton(inputColor)
            : undefined
        }
        selectionColor={inputColor}
      />
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 17,
    lineHeight: 25,
  },
  labelStyle: {
    fontSize: 12,
    fontWeight: "normal",
  },
});
