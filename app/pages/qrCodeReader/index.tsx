import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CameraView, useCameraPermissions } from "expo-camera";
import styles from "./styles";

export default function QrCodeReader() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permission}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome5 name="arrow-left" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.textPermission}>
          Garanta as permissões para acessar o quiz!
        </Text>
        <View style={styles.camera}>
          <MaterialCommunityIcons name="camera-off" size={250} color="black" />
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={requestPermission} style={styles.touchable}>
            <Text style={styles.textButton}>Garanta as permissões</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          router.back();
        }}
      >
        <FontAwesome5 name="arrow-left" size={40} color="white" />
      </TouchableOpacity>

      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={({ data }) => {
          console.log("data", data);
        }}
      >
        <MaterialCommunityIcons name="scan-helper" size={250} color="white" />
      </CameraView>
    </View>
  );
}
