import Toast from 'react-native-toast-message';

export const showToast = (type , title , text) => {
   Toast.show({
      type: type , 
      text1: title,
      text2:text,
      position: 'top',
      visibilityTime: 4000, 
      autoHide: true, 
      topOffset: 50, 
    });
  };