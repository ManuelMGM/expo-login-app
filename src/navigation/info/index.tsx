import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { Avatar, Text, Divider } from "react-native-elements";

import ScreenContainer from "../../components/ScreenContainer";
import Notifications from "../../components/Notifications";

import Requests from "../../helpers/Requests";
import User from "../../helpers/User";
import Colors from "../../helpers/Colors";

const avatarSize = Math.round(Dimensions.get("window").width * 0.4);

export default class Info extends React.Component<any, any> {
  state = {
    loading: true,
    user: {
      age: "",
      avatar: "",
      email: "",
      name: "",
      role: "",
      surname: "",
    },
  };

  private notifications: Notifications;

  async componentDidMount() {
    try {
      const response = await Requests.get("/api/v0/users/me", {
        token: "jwt-token",
      });

      if (response?.result) {
        this.setState({ user: response.data });
      } else {
        await this.notifications.showSnackbar({ text: response.error.message });

        await User.remove();
        this.props.navigation.replace("Loading");
      }
    } catch (e) {
    } finally {
      this.setState({ loading: false });
    }
  }

  logOutUSer = async () => {
    try {
      await this.notifications.showDialog({
        title: "Cerrar Sesión",
        text: "Seguro que quieres cerrar sesión?",
        okText: "SI",
        cancelText: "NO",
      });

      await User.remove();
      this.props.navigation.replace("Loading");
    } catch (e) {}
  };

  renderDetails = async () => {
    const { avatar, name, surname, email, age, role } = this.state.user;
    try {
      await this.notifications.showDialog({
        children: (
          <View style={{ padding: 10 }}>
            <View style={{ alignItems: "center" }}>
              {this.renderAvatar(avatar, 50)}
            </View>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Nombre: </Text>
              {name} {surname}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>E-mail: </Text>
              {email}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Edad: </Text>
              {age}
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Rol: </Text>
              {role}
            </Text>
          </View>
        ),
      });
    } catch (e) {}
  };

  renderAvatar = (avatar: string, size: number, onPress?: () => any) => {
    return (
      <Avatar
        rounded
        source={avatar ? { uri: avatar } : null}
        size={size}
        icon={{ name: "person" }}
        containerStyle={avatarStyle}
        onPress={onPress}
      />
    );
  };

  render() {
    const { avatar, email, name, surname } = this.state.user;

    return (
      <ScreenContainer
        topColor="red"
        title={`Hola ${name} ${surname}`}
        leftAction={this.renderAvatar(avatar, 35, this.renderDetails)}
        rightComponent={{
          icon: "logout",
          color: "#fff",
          size: 30,
          onPress: this.logOutUSer,
        }}
      >
        {this.state.loading ? (
          <ActivityIndicator size="large" color={Colors.button.success} />
        ) : (
          <View style={mainContainerStyle}>
            {this.renderAvatar(avatar, avatarSize)}
            <Text h4>{`${name} ${surname}`}</Text>
            <Divider style={dividerStyle} />
            <Text style={emailStyle}>{email}</Text>
          </View>
        )}
        <Notifications ref={(ref) => (this.notifications = ref)} />
      </ScreenContainer>
    );
  }
}

const {
  mainContainerStyle,
  avatarStyle,
  emailStyle,
  dividerStyle,
} = StyleSheet.create({
  mainContainerStyle: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatarStyle: {
    borderWidth: 4,
    borderColor: "grey",
  },
  emailStyle: {
    fontSize: 14,
    margin: 5,
  },
  dividerStyle: {
    marginHorizontal: 70,
    margin: 10,
    alignSelf: "stretch",
    backgroundColor: "grey",
  },
});
