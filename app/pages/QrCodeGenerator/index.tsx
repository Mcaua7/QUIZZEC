import { View, Text, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import QRCode from "react-native-qrcode-svg";

export default function QroCodeGenerator() {
  const params = useLocalSearchParams();
  let logo = require("../../../assets/QUIZZEC.png");
  const index = params.index
  const user = params?.user == undefined ? "Anônimo" : params?.user
  console.log(user)
  const data = {user, index}
  const QrCode = JSON.stringify(data)
  console.log('data', QrCode)

  function GoBack() {
    router.back();
  }

  return (
    <View className="w-screen h-full bg-[#412E8B]">
      <View className="p-3">
        <TouchableOpacity className="w-[40px]" onPress={GoBack}>
          <FontAwesome5 name="arrow-left" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View className="w-11/12 h-80 mx-auto my-16">
        {/* <View className="w-full bg-gray-500 h-full  "></View> */}
        <QRCode value={QrCode} logo={logo} size={350}/>
        <Text className="text-white text-lg m-2">
          Compartilhe o QRCODE para seus amigos para que eles possam acessar o
          Quiz também
        </Text>
      </View>
    </View>
  );
}
