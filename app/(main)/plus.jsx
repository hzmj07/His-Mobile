import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../../color";
import { useRouter } from "expo-router";

const Plus = ({ navigation }) => {
  const packes = [
    {
      id: "01010",
      name: "Historical Premium",
      price: "49.99 ₺",
      specifications: [
        ". Remove ad’s",
        ". Unlimited request",
        ". text voiceover",
      ],
    },
    {
      id: "02020",
      name: "Modern Premium",
      price: "59.99 ₺",
      specifications: [
        ". Ad-free experience",
        ". Priority support",
        ". Enhanced voiceover",
      ],
    },
    {
      id: "03030",
      name: "Futuristic Premium",
      price: "69.99 ₺",
      specifications: [
        ". AI-powered features",
        ". Unlimited storage",
        ". Premium voiceover",
      ],
    },
  ];

  const router = useRouter(); // useRouter hook'u, navigasyon işlemleri için kullanılır

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <View style={styles.topRightButton}>
        <MaterialIcons
         onPress={() => router.back()}
          name="arrow-back-ios-new"
          size={25}
          color="black"
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {packes.map((pack) => (
          <View
            key={pack.id}
            style={styles.packageContainer}
          >
            <View style={styles.packageHeader}>
              <MaterialCommunityIcons
                name="star-three-points"
                size={24}
                color="black"
              />
              <Text style={styles.packageName}>{pack.name}</Text>
            </View>

            <View style={styles.specificationsContainer}>
              {pack.specifications.map((spec, index) => (
                <Text key={index} style={styles.text}>
                  {spec}
                </Text>
              ))}
            </View>

            <TouchableOpacity style={styles.buton}>
              <Text style={styles.butonText}>{pack.price}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Plus;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topRightButton: {
    justifyContent: "center",
    height: 75,
    paddingLeft: 25,
  },
  packageContainer: {
    width: "80%",
    borderWidth: 1,
    height: 360,
    borderRadius: 16,
    backgroundColor: colors.inputBGC,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginBottom: 20,
  },
  packageHeader: {
    position: "absolute",
    top: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  packageName: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  specificationsContainer: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buton: {
    width: 120,
    height: 41,
    marginTop: 23,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    position: "absolute",
    bottom: 30,
  },
  butonText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
