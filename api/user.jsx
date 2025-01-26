import axios from "axios";
import {ipAdrees} from "../env"


export const get_actions = async (userId) => {
    
    try {
      const response = await axios.post(`http://${ipAdrees}:5055/user/actions`, {
        UserID : userId
      });
      console.log("responsssssssss" , response.data.durum);
      
      if (response.data.durum == "data") {
        return response.data.data
      }else{
        return []
      }
      
      // Gelen veriyi state'e at
    } catch (error) {
      console.log(error);
      
    }
  };
  
