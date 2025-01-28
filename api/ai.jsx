import axios from "axios";
import {ipAdrees} from "../env";
import * as FileSystem from "expo-file-system";

export const generateText = async (length, mesaj,expression, style, token , tur , lang) => {
  console.log("isloading");
  console.log(token);
  console.log(mesaj);
  console.log(lang);
  
    try {
      let pront ;

      if (tur == "person") {
        pront = `Create the life story of ${mesaj} with the following parameters: length: ${length}, tone: ${expression}, narrative: ${style}. Use high-quality sentences, and provide the story as the only response. Ensure to include a meaningful title at the beginning of the story. The entire text should be written in ${lang}.`;
      }else{
        pront = `Create the story of the ${mesaj} event with the following parameters: length: ${length}, tone: ${expression}, narrative: ${style}. Use high-quality sentences and provide the story as the only response. Ensure to include a meaningful title at the beginning of the story, paşam. The entire text should be written in ${lang}.`;
      }

  
    // API isteği
    const response = await axios.post(
      `http://${ipAdrees}:5055/ai/generateText`,
      { mesaj , pront },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // API'den gelen yanıtı işleme
    console.log("ai dosyasındaki veridir" ,  response.data);
    return  response.data ;
  } catch (error) {
    console.error("eroor" ,  error);
    return error.success;
  }
};



export const chatWithHistorical = async(mesaj , token , file) =>{
  console.log("contorlllll");
  
  const formData = new FormData();

  // Mesajı ekle (eğer varsa)
  if (mesaj) {
    formData.append('message', mesaj);
  }

  // Dosyayı ekle (eğer varsa)
  if (file) {
    const fileData = file.assets[0];
    console.log( "ermiş dosya (tasavvuf değil)" ,  fileData);
    
    try {
      const base64File = await FileSystem.readAsStringAsync(fileData.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      if (base64File) {
        formData.append('file', {
          uri: fileData.uri,
          name: fileData.name,
          type: fileData.mimeType,
          buffer: base64File,
        });
      }
    } catch (error) {
      console.log("File read error:", error);
    }
  }

  try {
    const response = await axios.post(
      `http://${ipAdrees}:5055/ai/chat_with_ai`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT token
          'Content-Type': 'multipart/form-data', // Form-data için gerekli
        },
      }
    );

    return response.data; // API'den gelen yanıt
  } catch (error) {
    console.error('Error:', error);
    throw error; // Hata durumunda hatayı fırlat
  }
}