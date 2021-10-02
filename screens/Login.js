import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { SIZES, COLORS } from "../constants";
import { database } from "../src/config/firebase";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login(props) {
  //const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [notvisible, setVisible] = useState(true);
  const [email, setEmail] = useState("");

  const signin = async () => {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    database
      .collection("users")
      .where("email", "==", email)
      .get()
      .then((query) => {
        if (query.size > 0) {
          query.forEach(async (element) => {
            let user = element.data();
            let userId = element.id;
            if (user.password === digest) {
              await AsyncStorage.setItem("type", user.type);
              await AsyncStorage.setItem("age", user.age);
              await AsyncStorage.setItem("contact", user.contact);
              await AsyncStorage.setItem("district", user.district);
              await AsyncStorage.setItem("email", user.email);
              await AsyncStorage.setItem("name", user.name);
              await AsyncStorage.setItem("address", user.address);
              await AsyncStorage.setItem("province", user.province);
              await AsyncStorage.setItem("userId", userId);
              await AsyncStorage.setItem("nic", user.NIC);
              Alert.alert("Login Successfull");
              if (user.type === "doctor") {
                props.navigation.navigate("doctorNav");
              } else {
                props.navigation.navigate("patientNav");
              }
            } else {
              Alert.alert("Incorrect Password");
            }
          });
        } else {
          Alert.alert("Incorrect Email");
        }
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      <View style={styles.header}>
        <ImageBackground
          source={require("../assets/covid.jpg")}
          style={styles.header}
          imageStyle={{
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
          }}
        />
      </View>
      <View
        style={{
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <Text style={styles.logintxt}>Login</Text>
        <View style={styles.inputContainer}>
          <Icons name="mail" color={COLORS.green} size={30} />
          <TextInput
            style={{ paddingHorizontal: 10, color: COLORS.green, fontSize: 20 }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icons name="lock" color={COLORS.green} size={30} />
          <TextInput
            style={{
              paddingHorizontal: 10,
              color: COLORS.green,
              fontSize: 20,
            }}
            placeholder="Password"
            value={password}
            secureTextEntry={notvisible}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={{ marginLeft: 250, top: 6, position: "absolute" }}
            onPress={() => setVisible(!notvisible)}
          >
            {notvisible ? (
              <Icons name="eye-outline" color={COLORS.green} size={30} />
            ) : (
              <Icons name="eye-off-outline" color={COLORS.green} size={30} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.inputContainer2, styles.btn]}
          onPress={signin}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.registerbtn, styles.inputContainer2]}
          onPress={() => props.navigation.navigate("Register")}
        >
          <Text
            style={{ color: COLORS.green, fontSize: 20, fontWeight: "bold" }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            marginTop: 10,
            alignItems: "center",
          }}
          // onPress={() => props.navigation.navigate("Forgot")}
        >
          <Text style={{ color: COLORS.green, fontSize: 15 }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    height: 250,
    width: "100%",
  },
  logintxt: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 28,
    color: COLORS.green,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 1,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: COLORS.green,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  btn: {
    backgroundColor: COLORS.green,
    justifyContent: "center",
    marginTop: 40,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
