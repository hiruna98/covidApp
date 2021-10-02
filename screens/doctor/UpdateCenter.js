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

export default function UpdateCenter(props) {
  const [name, setName] = useState(props.route.params.name);
  const [age, setAge] = useState(props.route.params.age);
  const [dose, setDose] = useState(props.route.params.dose);
  const [vaccine, setVaccine] = useState(props.route.params.vaccine);
  const [province, setProvince] = useState(props.route.params.province);
  const [district, setDistrict] = useState(props.route.params.district);

  const updateData = () => {
    if (name === "") {
      Alert.alert("Please fill the required fields❗");
    } else {
      database
        .collection("centers")
        .add({
          name: name,
          dose_no: dose,
          vaccine: vaccine,
          age: age,
          province: province,
          district: district,
        })
        .then((result) => {
          Alert.alert("Saved Successfully");
          props.navigation.navigate("Vaccine");
        });
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
              onPress={() => props.navigation.navigate("Vaccine")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Update Center</Text>
        </View>
      </SafeAreaView>
      <View style={styles.scrollcontainer}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={{
                paddingHorizontal: 10,
                color: COLORS.green,
                fontSize: 20,
              }}
              placeholder="Center Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          {/* *******************************Age Selector************************************* */}
          <Text style={styles.lable}>Age Limit</Text>
          <View style={[styles.inputContainer, { marginTop: 3 }]}>
            <Picker
              selectedValue={age}
              style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
              onValueChange={(itemValue) => setAge(itemValue)}
            >
              <Picker.Item label="Above 60" value="above 60" />
              <Picker.Item label="Above 30" value="above 30" />
              <Picker.Item label="Above 20" value="above 20" />
              <Picker.Item label="Above 12" value="above 12" />
            </Picker>
          </View>
          {/* *******************************Vaccine Selector************************************* */}
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
          {/* *******************************Dese Selector************************************* */}
          <Text style={styles.lable}>Dese Number</Text>
          <View style={[styles.inputContainer, { marginTop: 3 }]}>
            <Picker
              selectedValue={dose}
              style={{ paddingLeft: 280, color: COLORS.green, fontSize: 20 }}
              onValueChange={(itemValue) => setDose(itemValue)}
            >
              <Picker.Item label="Dose 1" value="1" />
              <Picker.Item label="Dose 2" value="2" />
              <Picker.Item label="Dose 3" value="3" />
            </Picker>
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
            <Text style={{ color: COLORS.white, fontSize: 20 }}>Update</Text>
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
    marginTop: 8,
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
