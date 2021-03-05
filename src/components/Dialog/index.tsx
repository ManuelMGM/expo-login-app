import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { Overlay, Text } from "react-native-elements";

import Button from "../Button";

import Colors from "../../helpers/Colors";

const { height, width } = Dimensions.get("screen"),
  maxHeight = height - 100;

export default class MobbexDialog extends Component<any, any> {
  private _resolve: boolean | any = false;
  private _reject: boolean | any = false;

  private _resetedState: any = {
    cancelText: "",
    okText: "",

    title: "",
    text: "",

    open: false,

    children: null,
  };

  state: any = { ...this._resetedState };

  reset() {
    this._reject = false;
    this._resolve = false;

    this.setState(this._resetedState);
  }

  open(options: any) {
    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;

      this.setState({ ...options, open: true });
    });
  }

  close() {
    this.handleClose(false);
  }

  handleClose(done: boolean) {
    if (done && this._resolve) {
      this._resolve();
    } else if (!done && this._reject) {
      this._reject();
    }

    this.reset();
  }

  render() {
    let { title, cancelText, okText, text, open, children } = this.state;

    return (
      <Overlay
        isVisible={open}
        onBackdropPress={() => this.handleClose(false)}
        overlayStyle={{
          borderRadius: 18,
          width: width - 30,
          maxHeight,
          paddingHorizontal: 25,
        }}
      >
        <>
          {!!title && <Text h4>{title}</Text>}
          {!!text && (
            <Text
              style={{ fontSize: 17, textAlign: "right", marginVertical: 25 }}
            >
              {text}
            </Text>
          )}
          {children}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {!!cancelText && (
              <Button
                title={cancelText}
                type="outline"
                color={Colors.button.danger}
                onPress={() => this.handleClose(false)}
              />
            )}
            {!!okText && (
              <Button
                title={okText}
                type="outline"
                color={Colors.button.success}
                onPress={() => this.handleClose(true)}
              />
            )}
          </View>
        </>
      </Overlay>
    );
  }
}
