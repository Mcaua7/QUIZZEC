import React, { useState } from "react";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function QuizPage() {
  const params = useLocalSearchParams()
  const index = params.index
  console.log("index: " ,index)

  function GoBack() {
    router.back()
  }
  return (
    <View>
      <View>
        <Text>OLAAA</Text>
      </View>
    </View>
  );
}
