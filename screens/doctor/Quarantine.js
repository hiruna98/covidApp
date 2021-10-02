import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SIZES, COLORS } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { database } from "../../src/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-datepicker";

export default function Quarantine(props) {
  const [NIC, setData] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [userId, setUser] = useState("");

  const getData = async () => {
    var nic = "";
    nic = await AsyncStorage.getItem("qrt");
    database
      .collection("users")
      .where("NIC", "==", nic)
      .get()
      .then((query) => {
        query.forEach((element) => {
          setUser(element.id);
        });
      });
    setData(nic);
  };
  useEffect(() => {
    getData();
  }, []);
  const updateData = () => {
    database.collection("users").doc(userId).update({
      quarantined: "true",
    });
    database
      .collection("quarantine")
      .add({
        start_date: start,
        end_date: end,
        user: NIC,
      })
      .then((result) => {
        Alert.alert("Quarantined Successfully");
        props.navigation.navigate("Patient");
      });

    console.log(NIC);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          height: 80,
          width: "100%",
          backgroundColor: COLORS.green,
          flexDirection: "row",
        }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <MaterialIcons
              name="arrow-back"
              size={30}
              color={COLORS.white}
              style={{ marginLeft: 20 }}
              onPress={() => {
                props.navigation.navigate("Patient");
              }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Quarantine</Text>
        </View>
      </SafeAreaView>
      <View style={styles.scrollcontainer}>
        <ScrollView>
          <Text style={styles.lable}>Start Date</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={{
                paddingHorizontal: 10,
                color: COLORS.green,
                fontSize: 20,
              }}
              placeholder="2021-01-01"
              value={start}
              onChangeText={(date) => setStart(date)}
            />
          </View>
          <Text style={styles.lable}>End Date</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={{
                paddingHorizontal: 10,
                color: COLORS.green,
                fontSize: 20,
              }}
              placeholder="2021-01-01"
              value={end}
              onChangeText={(date) => setEnd(date)}
            />
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
            onPress={updateData}
          >
            <Text style={{ color: COLORS.white, fontSize: 20 }}>Start</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollcontainer: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    marginTop: 12,
    color: COLORS.green,
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
  headerContainer: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.green,
  },
  buttonview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});
