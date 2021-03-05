import React from "react";
import SnackBar from "react-native-snackbar-component";

export interface SnackbarOptions {
  text: string;
  autoHide?: number;
  actionText?: string;
}

export default class ComponentSnackbar extends React.Component<any> {
  resetedState: any = {
    open: false,

    autoHide: 3000,
  };

  state: any = this.resetedState;

  private resolve: boolean | any = false;
  private reject: boolean | any = false;

  private autoHideTimer: any;

  public show(options: SnackbarOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!!this.autoHideTimer) {
        this.clearTimeOut();
        this.setState({ open: false });
        // wait until last snackbar closes
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      this.resolve = resolve;
      this.reject = reject;

      this.setState({ open: true, actionText: "✕", ...options }, this.autoHide);
    });
  }

  private handleClose() {
    try {
      this.resolve();
      this.clearTimeOut();
    } catch (e) {}
    this.reset();
  }

  private reset() {
    this.resolve = false;
    this.reject = false;

    this.setState(this.resetedState);
  }

  clearTimeOut = () => {
    this.autoHideTimer && clearTimeout(this.autoHideTimer);
    this.autoHideTimer = null;
  };

  autoHide = () => {
    const { autoHide } = this.state;

    if (!autoHide) return;
    this.autoHideTimer = setTimeout(this.handleClose.bind(this), autoHide);
  };

  render() {
    return (
      <SnackBar
        visible={this.state.open}
        textMessage={this.state.text ?? ""}
        actionHandler={() => this.handleClose()}
        actionText={this.state.actionText}
      />
    );
  }
}
