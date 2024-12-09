import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Redirect, router } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CameraView, useCameraPermissions } from "expo-camera";
import styles from "./styles";

export default function QrCodeReader() {
  type parametros = {
    index: string;
    user: string;
  };

  const [permission, requestPermission] = useCameraPermissions();
  const [params, setParams] = useState<parametros>();
  const [user, setUSer] = useState("");
  const [index, setIndex] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [quizInfo, setQuizInfo] = useState();

  useEffect(() => {
    console.log("useEffect", quizInfo);
    if (quizInfo) {
      router.navigate({
        pathname: "pages/QuizGame",
        params: { user, quizInfo },
      });

    }
  }, [quizInfo]);

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
          <TouchableOpacity
            onPress={requestPermission}
            style={styles.touchable}
          >
            <Text style={styles.textButton}>Garanta as permissões</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const getData = (index) => {
    fetch("https://api.jsonbin.io/v3/b/674f426ae41b4d34e45f34e2", {
      method: "GET",
      headers: {
        "X-Access-Key":
          "$2a$10$gCSm9EzP4f4OevslF6w/oe6rwH0ninVR0BZrSOHyTxw1OR/6EbVj.",
      },
    })
      .then((resp) => resp.json())
      .then((val) => setQuizData(val.record[index]));
    console.log("fetch", quizData);
  };

  const redirect = (quizInfo: string, user) => {
    if (!quizInfo) {
      console.log("aguardando dados");
    } else {
      // router.navigate({
      //   pathname: "pages/QuizGame",
      //   params: { user, quizInfo },
      // });
    }
  };

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
          setParams(JSON.parse(data));
          setUSer(params?.user);
          setIndex(params?.index);
          console.log("params", params);
          console.log("user", user);
          console.log("index", index);
          getData(index);
          setQuizInfo(JSON.stringify(quizData));
          redirect(quizInfo, user);
        }}
      >
        <MaterialCommunityIcons name="scan-helper" size={250} color="white" />
      </CameraView>
    </View>
  );
}
