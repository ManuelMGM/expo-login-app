import React from "react";
import { Text, ActivityIndicator, StyleSheet } from "react-native";

import ScreenContainer from "../../components/ScreenContainer";

import User from "../../helpers/User";
import Colors from "../../helpers/Colors";

export default function Loading({ navigation }) {
  React.useEffect(() => {
    async function checkUser() {
      const user = await User.get();

      navigation.navigate(user ? "Info" : "Login");
    }
    checkUser();
    return;
  }, [navigation]);

  return (
    <ScreenContainer>
      <ActivityIndicator size="large" color={Colors.button.success} />
      <Text style={textStyle}>Cargando ...</Text>
    </ScreenContainer>
  );
}

const { textStyle } = StyleSheet.create({
  textStyle: { marginTop: 20, fontSize: 18, fontWeight: "600" },
});
