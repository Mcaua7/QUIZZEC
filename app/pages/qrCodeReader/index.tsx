import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CameraView, useCameraPermissions } from "expo-camera";
import Toast from "react-native-toast-message";

export default function QrCodeReader() {
  const [permission, requestPermission] = useCameraPermissions();
  const [user, setUSer] = useState("");
  const [quizData, setQuizData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log("useEffect", quizData);
    const string = JSON.stringify(quizData);
    if (string) {
      console.log(string);
      router.navigate({
        pathname: "pages/QuizGame",
        params: { user, string },
      });
    }
  }, [quizData, user]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 pt-[80px] items-center bg-[#412E8B]">
        <TouchableOpacity
          className="absolute top-[10px] right-[340px] bg-[#412E8B] justify-center items-center rounded-[5px]"
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome5 name="arrow-left" size={40} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-[15px]">
          garanta as permissões para acessar a câmera
        </Text>
        <View className="h-[80%] w-[90%] rounded-[10px] justify-center pl-[50px] bg-[#e4e4e4] mb-[30px] mt-[10px]">
          <MaterialCommunityIcons name="camera-off" size={250} color="black" />
        </View>

        <View className="border-[1px] bg-white h-[50px] w-[300px] rounded-[10px] justify-center text-center">
          <TouchableOpacity
            onPress={requestPermission}
            className="flex-1 justify-center items-center rounded-[10px] border-[1px]"
          >
            <Text className="text-[#412E8B] text-[20px] font-bold'">
              Garanta as permissões
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const getData = async (index: number) => {
    console.log(index);
    if (isFetching === false) {
      setIsFetching(true);
      fetch("https://api.jsonbin.io/v3/b/674f426ae41b4d34e45f34e2", {
        method: "GET",
        headers: {
          "X-Access-Key":
            "$2a$10$gCSm9EzP4f4OevslF6w/oe6rwH0ninVR0BZrSOHyTxw1OR/6EbVj.",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => setQuizData(resp.record[index]));
    }
  };

  return (
    <View className="h-full w-screen">
      {user === "" ? (
        <View className="flex-1 pt-[80px] items-center bg-[#412E8B]">
          <TouchableOpacity
            className="absolute top-[10px] right-[340px] bg-[#412E8B] justify-center items-center rounded-[5px]"
            onPress={() => {
              router.back();
            }}
          >
            <FontAwesome5 name="arrow-left" size={40} color="white" />
          </TouchableOpacity>

          <CameraView
            className="h-[80%] w-[90%] rounded-[10px] justify-center pl-[50px] bg-[#e4e4e4] mb-[50px] mt-[10px]"
            facing="back"
            onBarcodeScanned={({ data }) => {
              try {
                const params = JSON.parse(data);
                setUSer(params.user);
                getData(params.index);
              } catch {
                Toast.show({
                  type: "error",
                  text1: "Erro ao Escanear QRCODE",
                  text2: "QRCODE Inválido",
                });
              }
            }}
          >
            <MaterialCommunityIcons
              name="scan-helper"
              size={250}
              color="white"
            />
          </CameraView>
        </View>
      ) : (
        <View className="h-full w-screen justify-center items-center">
          <ActivityIndicator size={"large"} color="#412E8B" />
        </View>
      )}
      <Toast />
    </View>
  );
}
