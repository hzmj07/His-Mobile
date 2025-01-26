import { StyleSheet, Text, View  , ActivityIndicator} from "react-native";
import React from "react";
import colors from "../color";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
        <ActivityIndicator size={"large"}  color={"black"}/>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
