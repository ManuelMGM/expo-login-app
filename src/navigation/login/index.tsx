import React from "react";

import ScreenContainer from "../../components/ScreenContainer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Snackbar from "../../components/Snackbar";

import Requests from "../../helpers/Requests";
import User from "../../helpers/User";

export default class Login extends React.Component<any, any> {
  state: any = {
    email: "",
    password: "",
    loadingButton: false,
    visible: false,
  };

  private snackbar: Snackbar;

  loginUser = async () => {
    try {
      this.setState({ loadingButton: true });
      const response = await Requests.post("/api/v0/authenticate", {
        email: this.state.email,
        password: this.state.password,
      });

      if (!!response?.result) {
        User.set(response.data);
        this.props.navigation.navigate("Info");
      } else {
        this.snackbar.show({ text: response.error.message });
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loadingButton: false });
    }
  };

  render() {
    const { email, password, loadingButton, visible } = this.state;

    return (
      <ScreenContainer style={{ padding: 15 }}>
        <Input
          placeholder="E-Mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(email) => this.setState({ email })}
        />

        <Input
          placeholder="Contraseña"
          password
          autoCapitalize="none"
          returnKeyType="done"
          value={password}
          onChangeText={(password) => this.setState({ password })}
          onSubmitEditing={this.loginUser}
        />

        <Button
          title="Iniciar Sesión"
          loading={loadingButton}
          onPress={this.loginUser}
          outerContainerStyle={{ alignSelf: "flex-end" }}
        />

        <Snackbar ref={(ref) => (this.snackbar = ref)} />
      </ScreenContainer>
    );
  }
}
