import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../../color";
import { get_actions } from "../../api/user";
import { UserContext } from "../../context/context";
import Loading from "../../components/loading";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const Login = ({ navigation }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const { language } = useContext(UserContext);
  const router = useRouter(); // useRouter hook'u, navigasyon işlemleri için kullanılır

  const getData = async () => {
    try {
      const fetchedData = await get_actions(user._id);
      console.log(fetchedData);

      setData(fetchedData);
    } catch (error) {
      setData([]); // Veri yüklenmezse boş bir array atanır
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderMessageText = (text) => {
    console.log(text);
    const sections = text.split(/(\*\*.*?\*\*|https?:\/\/[^\s]+)/g);
    return sections.map((section, index) => {
      section = section.replace(/\[|\]/g, "");

      if (section.startsWith("##")) {
        const title = section.slice(2, -2);
        return (
          <Text key={index} style={{ fontWeight: "bold" }}>
            {title}
            {"\n"}
            {"\n"}
          </Text>
        );
      } else if (section.startsWith("*") && section.endsWith("*")) {
        const title = section.slice(2, -2);
        return (
          <Text key={index} style={{ fontWeight: "bold" }}>
            {title}
          </Text>
        );
      } else if (section.startsWith("http")) {
        console.log(section);

        const url = new URL(section);
        const domain = url.hostname.replace("www.", "");
        return (
          <TouchableOpacity
            key={index}
            onPress={() => Linking.openURL(section)}
          >
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              {domain}
            </Text>
          </TouchableOpacity>
        );
      } else if (section.trim()) {
        return <Text key={index}>{section}</Text>;
      }
      return null;
    });
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* Üst Bar */}
      <View style={styles.topRightButton}>
        <View
          style={{
            width: "50%",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <MaterialIcons
            onPress={() => router.back()}
            name="arrow-back-ios-new"
            size={25}
            color="black"
          />
          <Text style={styles.headerTitle}>{t("pastActions")}</Text>
        </View>
      </View>

      {isLoading ? (
        <Loading />
      ) : data.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {[...data].reverse().map((item, index) => (
            <View
              key={index}
              style={[
                styles.element,
                expandedIndex === index && styles.expandedElement,
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <TouchableOpacity onPress={() => toggleExpand(index)}>
                  <MaterialIcons
                    name={
                      expandedIndex === index
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    }
                    size={32}
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={styles.Elementtext}>
                  {item.req.substring(0, 30)}
                </Text>
              </View>
              {expandedIndex === index && (
                <View>
                  <View style={styles.expandedContent}>
                    <Text style={styles.expandedText}>
                      {renderMessageText(item.res.substring(0, 150))}
                    </Text>
                  </View>
                  <Text
                    onPress={() =>
                      router.push({
                        pathname: "/text",
                        params: { data: item.res }, // Parametre gönder
                      })
                    }
                    style={{ fontSize: 16, textAlign: "right", marginTop: 7 }}
                  >
                    Daha fazla görüntüle
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>No actions found.</Text>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
    width: "100%",
  },
  topRightButton: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    paddingLeft: 22,
    paddingRight: 22,
  },
  headerTitle: {
    textAlign: "left",
    width: "80%",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 12,
  },
  element: {
    width: "90%",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: colors.inputBGC,
    borderWidth: 1,
    borderRadius: 16,
    height: 60,
    borderColor: colors.inputBorder,
    overflow: "hidden",
    paddingLeft: 20,
    paddingRight: 20,
  },
  expandedElement: {
    height: "auto",
    paddingTop: 20,
    paddingBottom: 9,
  },
  Elementtext: {
    fontSize: 18,
    textAlign: "left",
    marginLeft: 10,
    fontWeight: "bold",
    flexShrink: 1,
  },
  expandedContent: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 8,
  },
  expandedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  noDataText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
});
