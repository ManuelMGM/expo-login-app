import React, { PureComponent } from "react";

import MobbexDialog from "../Dialog";
import Snackbar, { SnackbarOptions as SBOptions } from "../Snackbar";

export interface SnackbarOptions extends SBOptions {}

export default class Notifications extends PureComponent<any, any> {
  dialog: MobbexDialog | any;
  snackbar: Snackbar | any;

  public showDialog(options: any): Promise<any> {
    return this.dialog.open(options);
  }

  public showSnackbar(options: SnackbarOptions): Promise<any> {
    return this.snackbar.show(options);
  }

  render() {
    return (
      <>
        <Snackbar ref={(ref: Snackbar) => (this.snackbar = ref)} />
        <MobbexDialog ref={(ref: MobbexDialog) => (this.dialog = ref)} />
      </>
    );
  }
}
