import Constants from 'expo-constants';
import { Platform } from 'react-native';

const isExpoGo = Constants.executionEnvironment === 'storeClient';

//if expogo return null and cant use google sign in
export const signInWithGoogle = async () => {
  if (isExpoGo) {
    console.log('Google Sign-In is not available in Expo Go');
    return null;
  }
  
  // import the native Google Signin module only when running in a native environment
  const { GoogleSignin, statusCodes } = await import('@react-native-google-signin/google-signin');
  
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    GoogleSignin.configure({
      webClientId: '209540280192-cfv5dseulqeeq95t9vagrhmbt2acfva4.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }
  
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign in is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services not available or outdated');
    } else {
      console.error(error);
    }
    throw error;
  }
};