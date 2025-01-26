import axios from "axios";
import {ipAdrees} from "../env"
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


export const chatWithHistorical = async(mesaj , token) =>{
  console.log("loading...");
  
  try {
    const response = await axios.post(
      `http://${ipAdrees}:5055/ai/chat_with_ai`,
      {"message":mesaj },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("ai dosyasındaki veridir" ,  response.data);
    return  response.data ;
  } catch (error) {
    console.error(error);
    
  }
}
