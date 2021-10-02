import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { SIZES, COLORS, icons } from "../constants";
import { database } from "../src/config/firebase";
import * as Crypto from "expo-crypto";

export default function Register(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [notvisible1, setVisible1] = useState(true);
  const [notvisible2, setVisible2] = useState(true);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [nic, setNic] = useState("");

  const submitData = async () => {
    if (password === repassword) {
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
            Alert.alert("Email exist");
          } else {
            database
              .collection("users")
              .add({
                name: name,
                email: email,
                password: digest,
                address: address,
                contact: contact,
                age: age,
                type: "patient",
                province: province,
                district: district,
                NIC: nic,
                quarantined: "false",
                dose: "0",
                next_vaccine_date: "-",
                vaccine: "-",
              })
              .then((result) => {
                Alert.alert("Registered Successfully");
                props.navigation.navigate("Login");
              });
          }
        });
    } else {
      Alert.alert("Passwords does not match!");
    }
  };

  const renderWesternPicker = () => {
    return (
      <Picker
        selectedValue={district}
        style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Colombo" value="Colombo" />
        <Picker.Item label="Gampaha" value="Gampaha" />
        <Picker.Item label="Kalutara" value="Kalutara" />
      </Picker>
    );
  };
  const renderCentralPicker = () => {
    return (
      <Picker
        selectedValue={district}
        style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Kandy" value="Kandy" />
        <Picker.Item label="Matale" value="Matale" />
        <Picker.Item label="Nuwara Eliya" value="Nuwara_Eliya" />
      </Picker>
    );
  };
  const renderSouthernPicker = () => {
    return (
      <Picker
        selectedValue={district}
        style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Galle" value="Galle" />
        <Picker.Item label="Matara" value="Matara" />
        <Picker.Item label="Hambantota" value="Hambantota" />
      </Picker>
    );
  };
  const renderNorthernPicker = () => {
    return (
      <Picker
        selectedValue={district}
        style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Jaffna" value="Jaffna" />
        <Picker.Item label="Mannar" value="Mannar" />
        <Picker.Item label="Vavuniya" value="Vavuniya" />
        <Picker.Item label="Mullaitivu" value="Mullaitivu" />
        <Picker.Item label="Kilinochchi" value="Kilinochchi" />
      </Picker>
    );
  };
  const renderEasternPicker = () => {
    return (
      <Picker
        selectedValue={district}
        style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Batticaloa" value="Batticaloa" />
        <Picker.Item label="Ampar" value="Ampar" />
        <Picker.Item label="Trincomalee" value="Trincomalee" />
      </Picker>
    );
  };
  const renderNorth_WesternPicker = () => {
    return (
      <Picker
        selectedValue={district}
        style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Kurunegala" value="Kurunegala" />
        <Picker.Item label="Puttalam" value="Puttalam" />
      </Picker>
    );
  };
  const renderNorth_CentralPicker = () => {
    return (
      <Picker
        selectedValue={district}
        style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Anuradhapura" value="Anuradhapura" />
        <Picker.Item label="Polonnaruwa" value="Polonnaruwa" />
      </Picker>
    );
  };
  const renderUwaPicker = () => {
    return (
      <Picker
        selectedValue={district}
        style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Badulla" value="Badulla" />
        <Picker.Item label="Moneragala" value="Moneragala" />
      </Picker>
    );
  };
  const renderSabaragamuwaPicker = () => {
    return (
      <Picker
        selectedValue={district}
        style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Ratnapura" value="Ratnapura" />
        <Picker.Item label="Kegalle" value="Kegalle" />
      </Picker>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <MaterialIcons
            name="arrow-back"
            size={30}
            color={COLORS.white}
            style={{ marginLeft: 20 }}
            onPress={() => props.navigation.navigate("Login")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Register</Text>
      </View>

      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: COLORS.green, fontSize: 20 }}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: COLORS.green, fontSize: 20 }}
            placeholder="Age"
            keyboardType="number-pad"
            value={age}
            onChangeText={(text) => setAge(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: COLORS.green, fontSize: 20 }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: COLORS.green, fontSize: 20 }}
            placeholder="Contact Number"
            keyboardType="number-pad"
            value={contact}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: COLORS.green, fontSize: 20 }}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: COLORS.green, fontSize: 20 }}
            placeholder="NIC"
            value={nic}
            onChangeText={(text) => setNic(text)}
          />
        </View>
        {/* *******************************Province Selector************************************* */}
        <Text style={styles.lable}>Province</Text>
        <View style={[styles.inputContainer, { marginTop: 3 }]}>
          <Picker
            selectedValue={province}
            style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
            onValueChange={(itemValue) => setProvince(itemValue)}
          >
            <Picker.Item label="Western" value="Western" />
            <Picker.Item label="Central" value="Central" />
            <Picker.Item label="Southern" value="Southern" />
            <Picker.Item label="Northern" value="Northern" />
            <Picker.Item label="Eastern" value="Eastern" />
            <Picker.Item label="North-Western" value="North_Western" />
            <Picker.Item label="North-Central" value="North_Central" />
            <Picker.Item label="Uwa" value="Uwa" />
            <Picker.Item label="Sabaragamuwa" value="Sabaragamuwa" />
          </Picker>
        </View>
        {/* *******************************District Selector************************************* */}
        <Text style={styles.lable}>District</Text>
        <View style={[styles.inputContainer, { marginTop: 3 }]}>
          {province === "Western"
            ? renderWesternPicker()
            : province === "Central"
            ? renderCentralPicker()
            : province === "Southern"
            ? renderSouthernPicker()
            : province === "Northern"
            ? renderNorthernPicker()
            : province === "Eastern"
            ? renderEasternPicker()
            : province === "North_Western"
            ? renderNorth_WesternPicker()
            : province === "North_Central"
            ? renderNorth_CentralPicker()
            : province === "Uwa"
            ? renderUwaPicker()
            : renderSabaragamuwaPicker()}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Password"
            value={password}
            secureTextEntry={notvisible1}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={{ marginLeft: 250, top: 6, position: "absolute" }}
            onPress={() => setVisible1(!notvisible1)}
          >
            {notvisible1 ? (
              <Icons name="eye-outline" color={COLORS.green} size={30} />
            ) : (
              <Icons name="eye-off-outline" color={COLORS.green} size={30} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#0E357A", fontSize: 20 }}
            placeholder="Re Enter Password"
            value={repassword}
            secureTextEntry={notvisible2}
            onChangeText={(text) => setRePassword(text)}
          />
          <TouchableOpacity
            style={{ marginLeft: 250, top: 6, position: "absolute" }}
            onPress={() => setVisible2(!notvisible2)}
          >
            {notvisible2 ? (
              <Icons name="eye-outline" color={COLORS.green} size={30} />
            ) : (
              <Icons name="eye-off-outline" color={COLORS.green} size={30} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.inputContainer, styles.btn]}
          onPress={submitData}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            SIGNUP
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginLeft: 20,
    alignSelf: "center",
    color: COLORS.white,
  },
  lable: {
    fontSize: 18,
    marginLeft: 40,
    marginTop: 8,
    color: COLORS.green,
  },
  headerContainer: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.green,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 1.5,
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
    marginBottom: 10,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
