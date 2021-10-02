import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { SIZES, COLORS } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { Title, Card, Button } from "react-native-paper";
import { database } from "../../src/config/firebase";
import * as Crypto from "expo-crypto";
import { set } from "react-native-reanimated";

export default function Profile(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [notvisible1, setVisible1] = useState(true);
  const [notvisible2, setVisible2] = useState(true);
  const [notvisible3, setVisible3] = useState(true);
  const [modal, setmodal] = useState(null);
  const [curpass, setCpass] = useState("");
  const [pass, setpass] = useState("");
  const [newpass, setNpass] = useState("");
  const [repass, setRpass] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setloading] = useState(true);

  const getData = async () => {
    const em = await AsyncStorage.getItem("email");
    database
      .collection("users")
      .where("email", "==", em)
      .get()
      .then((query) => {
        if (query.size > 0) {
          query.forEach((element) => {
            let user = element.data();
            let uid = element.id;
            setName(user.name);
            setAge(user.age);
            setPhone(user.contact);
            setEmail(user.email);
            setAddress(user.address);
            setType(user.type);
            setProvince(user.province);
            setDistrict(user.district);
            setpass(user.password);
            setUserId(uid);
            setloading(false);
          });
        }
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("type");
      await AsyncStorage.removeItem("age");
      await AsyncStorage.removeItem("contact");
      await AsyncStorage.removeItem("district");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("address");
      await AsyncStorage.removeItem("province");

      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Login" }],
        })
      );
      props.navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };
  function renderModel() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => setmodal(false)}
      >
        <View style={styles.modalview}>
          <View
            style={[
              styles.inputContainer,
              { right: 0, marginHorizontal: 20, borderColor: COLORS.green },
            ]}
          >
            <TextInput
              style={{
                paddingHorizontal: 10,
                color: COLORS.black,
                fontSize: 20,
              }}
              placeholder="Current Password"
              placeholderTextColor={COLORS.gray}
              value={curpass}
              secureTextEntry={notvisible1}
              onChangeText={(text) => setCpass(text)}
            />
            <TouchableOpacity
              style={{ marginLeft: 275, top: 6, position: "absolute" }}
              onPress={() => setVisible1(!notvisible1)}
            >
              {notvisible1 ? (
                <Icons name="eye-outline" color={COLORS.green} size={30} />
              ) : (
                <Icons name="eye-off-outline" color={COLORS.green} size={30} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.inputContainer,
              { right: 0, marginHorizontal: 20, borderColor: COLORS.green },
            ]}
          >
            <TextInput
              style={{
                paddingHorizontal: 10,
                color: COLORS.black,
                fontSize: 20,
              }}
              placeholder="New Password"
              placeholderTextColor={COLORS.gray}
              value={newpass}
              secureTextEntry={notvisible2}
              onChangeText={(text) => setNpass(text)}
            />

            <TouchableOpacity
              style={{ marginLeft: 275, top: 6, position: "absolute" }}
              onPress={() => setVisible2(!notvisible2)}
            >
              {notvisible2 ? (
                <Icons name="eye-outline" color={COLORS.green} size={30} />
              ) : (
                <Icons name="eye-off-outline" color={COLORS.green} size={30} />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.inputContainer,
              { right: 0, marginHorizontal: 20, borderColor: COLORS.green },
            ]}
          >
            <TextInput
              style={{
                paddingHorizontal: 10,
                color: COLORS.black,
                fontSize: 20,
              }}
              placeholder="Re-Enter Password"
              placeholderTextColor={COLORS.gray}
              value={repass}
              secureTextEntry={notvisible3}
              onChangeText={(text) => setRpass(text)}
            />
            <TouchableOpacity
              style={{ marginLeft: 275, top: 6, position: "absolute" }}
              onPress={() => setVisible3(!notvisible3)}
            >
              {notvisible3 ? (
                <Icons name="eye-outline" color={COLORS.green} size={30} />
              ) : (
                <Icons name="eye-off-outline" color={COLORS.green} size={30} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.inputContainer,
              styles.buttonview,
              {
                right: 0,
                marginHorizontal: 20,
                borderColor: COLORS.green,
                justifyContent: "center",
                backgroundColor: COLORS.green,
              },
            ]}
            onPress={resetPassword}
          >
            <Text style={{ color: COLORS.white, fontSize: 20 }}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.inputContainer2,
              {
                right: 0,
                marginHorizontal: 20,
                borderColor: COLORS.green,
                justifyContent: "center",
              },
            ]}
            onPress={() => {
              setCpass("");
              setNpass("");
              setRpass("");
              setmodal(false);
            }}
          >
            <Text style={{ fontSize: 20, color: COLORS.green }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
  const resetPassword = async () => {
    if (newpass !== "" && repass !== "" && curpass !== "") {
      if (newpass === repass) {
        const digest = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          curpass
        );
        if (digest === pass) {
          const digest2 = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            newpass
          );
          database
            .collection("users")
            .doc(userId)
            .update({
              password: digest2,
            })
            .then(() => {
              setCpass("");
              setNpass("");
              setRpass("");
              setmodal(false);
              Alert.alert("Reset Successfully!");
            });
        } else {
          Alert.alert("Current Password Incorrect!");
        }
      } else {
        Alert.alert("New passwords does not match!");
      }
    } else {
      Alert.alert("Please fill the required fields!");
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <SafeAreaView
            style={{
              height: 80,
              width: "100%",
              backgroundColor: COLORS.green,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", padding: SIZES.padding }}>
                <Text
                  style={{ color: COLORS.white, marginLeft: 20, fontSize: 23 }}
                >
                  Profile
                </Text>
              </View>
              <View>
                <Icons
                  name="bell-outline"
                  style={{ padding: SIZES.padding }}
                  color="#ffffff"
                  size={30}
                  onPress={() => logout()}
                />
              </View>
            </View>
          </SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={() => getData()}
                refreshing={loading}
              />
            }
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/PngItem_4212266.png")}
              />
              <Text
                style={{ fontSize: 25, fontWeight: "700", color: COLORS.green }}
              >
                {name}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: "600", color: COLORS.green }}
              >
                {type}
              </Text>
            </View>
            <Card style={styles.card}>
              <View style={styles.cardcontent}>
                <Icons
                  style={{ marginTop: 5 }}
                  name="email"
                  size={24}
                  color={COLORS.green}
                />
                <Text style={styles.subtitle}>{email}</Text>
              </View>
            </Card>
            <Card style={styles.card}>
              <View style={styles.cardcontent}>
                <Icons
                  style={{ marginTop: 5 }}
                  name="phone"
                  size={24}
                  color={COLORS.green}
                />
                <Text style={styles.subtitle}>{contact}</Text>
              </View>
            </Card>
            <Card style={styles.card}>
              <View style={styles.cardcontent}>
                <Entypo
                  style={{ marginTop: 5 }}
                  name="address"
                  size={24}
                  color={COLORS.green}
                />
                <Text style={styles.subtitle}>{address}</Text>
              </View>
            </Card>
            <TouchableOpacity
              style={[styles.inputContainer2, styles.btn]}
              onPress={() =>
                props.navigation.navigate("UpdateProfile", {
                  name,
                  age,
                  contact,
                  email,
                  address,
                  type,
                  province,
                  district,
                  userId,
                })
              }
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Update Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.inputContainer2, styles.btn, { marginTop: 10 }]}
              onPress={() => setmodal(true)}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Reset Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.inputContainer2, styles.btn, { marginTop: 10 }]}
              onPress={logout}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {renderModel()}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 60,
  },
  imageContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 23,
    height: 250,
    width: "100%",
  },
  image: {
    marginHorizontal: 0,
    borderRadius: 90,
    height: 180,
    width: 180,
  },
  card: {
    padding: 10,
    marginVertical: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardcontent: {
    flexDirection: "row",
    padding: 8,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 5,
  },
  buttonview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  modalview: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    height: "55%",
    borderWidth: 1,
    borderColor: COLORS.green,
    backgroundColor: COLORS.lightGreen3,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    elevation: SIZES.elevation,
  },
  lable: {
    fontSize: 18,
    marginLeft: 40,
    marginTop: 8,
    color: COLORS.green,
  },
  modalview2: {
    position: "relative",
    bottom: 0,
    paddingBottom: 10,
    width: "100%",
    height: "100%",
    borderWidth: 1,
    elevation: SIZES.elevation,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 18,
    marginLeft: 15,
    marginRight: 15,
    paddingHorizontal: 20,
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingVertical: 2,
    height: 45,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
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
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginLeft: 20,
    alignSelf: "center",
    color: COLORS.white,
  },
  headerContainer: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.green,
  },
});
