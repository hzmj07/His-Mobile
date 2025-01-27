import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  Linking,
} from "react-native";
import colors from "../../color";
import { chatWithHistorical } from "../../api/ai";
import { UserContext } from "../../context/context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from 'react-i18next';
import { useRouter } from "expo-router";

const ChatScreen = ({ navigation }) => {
  const { token } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState();
  const [showChat, setshowChat] = useState(false);
  const router = useRouter(); // useRouter hook'u, navigasyon işlemleri için kullanılır
  
  const { t } = useTranslation();
  // Mesaj ekleme fonksiyonu
  const sendMessage = async () => {
    setInputText("");

    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: inputText, sender: "user" },
      ]);

      const placeholderMessage = {
        id: Date.now().toString(),
        text: "",
        sender: "other",
        loading: true, // Set a loading flag
      };
      setMessages((prevMessages) => [...prevMessages, placeholderMessage]);

      try {
        const data = await chatWithHistorical(inputText, token.accessToken);
        console.log("elimizsdeki data", data);

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === placeholderMessage.id
              ? { ...msg, text: data?.message, loading: false }
              : msg
          )
        );
      } catch (error) {
        console.error(`dataa`, error);
      }
    }
  };

  const buttonsData = [
    {
      id: "3",
      text: "Tarihte Bugün",
      icon: (
        <MaterialCommunityIcons
          name="chat-question-outline"
          size={24}
          color="black"
        />
      ),
      title: `Bu günün özelliği nedir ? (${new Date().toLocaleDateString(
        "tr-TR",
        { month: "short", day: "2-digit" }
      )})`,
    },
  ];

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

  // Mesajları render eden fonksiyon
  const renderItem = ({ item }) => {
    if (item.loading) {
      return (
        <View
          style={[
            styles.messageContainer,
            item.sender === "user" ? styles.userMessage : styles.otherMessage,
          ]}
        ><ActivityIndicator />
        </View>
      );
    }

    return (
      <TouchableOpacity
        onLongPress={() => {
          console.log("logPress");
        }}
        style={[
          styles.messageContainer,
          item.sender === "user" ? styles.userMessage : styles.otherMessage,
        ]}
      >
        {item.sender === "user" ? null : (
          <Image
            style={{ height: 24, width: 24, marginRight: 12 }}
            source={require("../../assets/images/logo.png")}
          />
        )}
        <Text style={styles.messageText}>
          {renderMessageText(item.text.trim())}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 20,
          height: 65,
          alignItems: "center",
        }}
      >
        <MaterialIcons
         onPress={() => router.back()}
          name="arrow-back-ios-new"
          size={25}
          color="black"
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
          Historical Ai
        </Text>
        <Feather
          style={{ position: "absolute", right: 20 }}
          onPress={() => setMessages([])}
          name="edit"
          size={25}
          color="black"
        />
      </View>{messages.length > 0 ? (
        <View style={{ flex: 1, paddingRight: 15 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={messages.slice().reverse()}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            inverted // Son mesajı üste göstermek için
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <View style={styles.main}>
            <FlatList
              data={buttonsData}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setInputText(item.title)}
                  style={[styles.buton, { marginLeft: 16 }]}
                >
                  {item.icon}
                  <Text style={styles.butonText}> {item.text}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}

      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.inputContainer}>
          <Ionicons name="document-attach-outline" size={29} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Ask me..."
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            disabled={!inputText}
            style={styles.sendButton}
            onPress={sendMessage}
          >
            <Feather name="send" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  messageContainer: {
    flexDirection: "row",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#e5e5ea",
    marginLeft: 30,
  },
  otherMessage: {
    alignSelf: "flex-start",
    marginRight: 30,
    marginLeft: 9,
  },
  messageText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#ddd",
   
    borderRadius: 16,
    marginBottom: 19,
    width: "94%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.inputBGC,
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop:8,
    paddingBottom:8
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginLeft: 12,
  },
  sendButton: {
    height: 40,
    width: 40,
    backgroundColor: "#000",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buton: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    backgroundColor: colors.inputBGC,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  main: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    height: 350,
  },
  butonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 12,
  },
});

export default ChatScreen;
