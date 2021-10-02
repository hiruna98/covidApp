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

export default function Vaccinate(props) {
  const [NIC, setData] = useState("");
  const [dose, setDose] = useState("");
  const [vaccine, setVaccine] = useState("");
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
      dose: dose,
      next_vaccine_date: end,
    });
    database
      .collection("vaccination")
      .add({
        NIC: NIC,
        dose: dose,
        vaccine: vaccine,
        next_vaccine_date: end,
      })
      .then((result) => {
        Alert.alert("Vaccination Successfully");
        props.navigation.navigate("Patient");
      });
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
          <Text style={styles.title}>Vaccinate</Text>
        </View>
      </SafeAreaView>
      <View style={styles.scrollcontainer}>
        <ScrollView>
          <Text style={styles.lable}>Dose Number</Text>
          <View style={[styles.inputContainer, { marginTop: 3 }]}>
            <Picker
              selectedValue={dose}
              style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
              onValueChange={(itemValue) => setDose(itemValue)}
            >
              <Picker.Item label="01" value="01" />
              <Picker.Item label="02" value="02" />
              <Picker.Item label="03" value="03" />
              <Picker.Item label="04" value="04" />
            </Picker>
          </View>
          <Text style={styles.lable}>Vaccine Type</Text>
          <View style={[styles.inputContainer, { marginTop: 3 }]}>
            <Picker
              selectedValue={vaccine}
              style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
              onValueChange={(itemValue) => setVaccine(itemValue)}
            >
              <Picker.Item label="Moderna" value="Moderna" />
              <Picker.Item label="Pfizer/BioNTech" value="Pfizer/BioNTech" />
              <Picker.Item label="Sputnik V" value="Sputnik V" />
              <Picker.Item label="AstraZeneca" value="AstraZeneca" />
              <Picker.Item label="Sinopharm" value="Sinopharm" />
              <Picker.Item label="Sinovac" value="Sinovac" />
            </Picker>
          </View>
          <Text style={styles.lable}>Next Vaccination Date</Text>
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
                marginTop: 30,
              },
            ]}
            onPress={updateData}
          >
            <Text style={{ color: COLORS.white, fontSize: 20 }}>Done</Text>
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
    marginTop: 10,
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
