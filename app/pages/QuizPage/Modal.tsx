import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function GameModal({
  ShowModal,
  setShowModal,
  string,
  user,
  index,
}: GameModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={ShowModal}
      onRequestClose={() => setShowModal(false)}
    >
      <View className="bg-[#0000005d] h-full w-screen">
        <View className="bg-white p-1 my-auto w-11/12 mx-auto rounded-[5px]">
          <TouchableOpacity
            className="bg-[#412E8B] p-4 rounded-[5px]"
            onPress={() => alert("nao funciona")}
          >
            <Text className="text-center text-white text-lg">Jogar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "pages/QrCodeGenerator",
                params: { quizInfo, user, index },
              })
            }
            className="mt-1 bg-[#412E8B] p-4 rounded-[5px]"
          >
            <Text className="text-center text-white text-lg">Compartilhar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

type GameModalProps = {
  ShowModal: boolean;
  setShowModal: Function;
  string: string;
  user: string;
};
