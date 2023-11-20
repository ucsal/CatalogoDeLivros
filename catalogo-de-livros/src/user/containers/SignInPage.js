// components
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { CustomButton } from "../../common";
import { CustomInput } from "../../common";
// assets
// @ts-ignore
import logo from "../images/Study.png";
// flow
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_HOST_ADDRESS } from "../../../env";

import { getUserByUsernameAndPassword } from "../../database";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = async () => {
    try {
      const userId = await getUserByUsernameAndPassword(username, password);
      const response = await axios.post(`${API_HOST_ADDRESS}/auth/signIn`, {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        await AsyncStorage.setItem("token", JSON.stringify(token.token));
        await AsyncStorage.setItem("userId", userId.toString());
      }
      navigation.navigate("HomePage");
    } catch (error) {
      console.error("Erro de login: ", error);
    }
  };

  const onForgotPasswordPressed = () => {
    console.warn("onForgotPasswordPressed");
  };

  const onSignUpPressed = () => {
    navigation.navigate("Signup");
  };

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Image style={[styles.logo]} source={logo} />
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>Navegue por Seus Livros Favoritos</Text>
        <Text style={styles.text}>
          Todos os seus Livros favoritos em apenas um lugar, marque favoritos e
          adicione anotações em qualquer lugar!
        </Text>
      </View>
      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
        secureTextEntry={false}
      />

      <CustomInput
        placeholder="Senha"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <CustomButton onPress={onSignInPressed} text="Entrar" type="PRIMARY" />

      <CustomButton
        onPress={onForgotPasswordPressed}
        text="Esqueci Minha Senha"
        type="TERTIARY"
      />
      <CustomButton
        onPress={onSignUpPressed}
        text="Não possui uma conta? Criar Conta"
        type="TERTIARY"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: "20%",
  },
  logo: {
    width: 330,
    height: 330,
    marginBottom: 15,
  },
  textContainer: {
    padding: 15,
  },
  boldText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    opacity: 0.5,
    textAlign: "center",
  },
});
