// flow
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
// components
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { CustomButton } from "../../common";
import { CustomInput } from "../../common";

import { insertUser } from "../../database";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState();

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onRegisterPressed = async () => {
    if (!username || !email || !password || !passwordRepeat) {
      console.warn("Por Favor, preencha todos os campos");
      return;
    }

    if (password !== passwordRepeat) {
      console.warn("As senhas não coincidem");
      return;
    }

    try {
      await insertUser(username, email, password);
      console.log("Usuário registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  const onTermsOfUserPressed = () => {
    console.warn("onTermsOfUserPressed");
  };

  const onPrivacyPolicyPressed = () => {
    console.warn("onPrivacyPolicyPressed");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Crie sua Conta</Text>
        <CustomInput
          placeholder="Nome de Usuário"
          value={username}
          setValue={setUsername}
          secureTextEntry={false}
        />

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          secureTextEntry={false}
        />

        <CustomInput
          placeholder="Senha"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <CustomInput
          placeholder="Repita a Senha"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />

        <CustomButton
          onPress={onRegisterPressed}
          text="Register"
          type="PRIMARY"
        />

        <Text style={styles.text}>
          Ao se registrar, você confirma que aceita nossos{" "}
          <Text style={styles.link} onPress={onTermsOfUserPressed}>
            Termos de uso
          </Text>{" "}
          e{" "}
          <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
            política de Privacidade
          </Text>
        </Text>
        <CustomButton
          onPress={onSignInPressed}
          text="Conta já existente"
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    paddingVertical: "50%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
