import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();
  const authHandler = async () => {
    // Create a redirect URL for your app to handle after login
    // const redirectUrl = Linking.createURL(""); // The URL to redirect after auth is complete
    const redirectUrl = "https://www.iana.org/help/example-domains"
    // const redirectUrl = AuthSession.getRedirectUrl('help/example-domains')
    // const redirectUrl = AuthSession.makeRedirectUri({
    //   scheme: 'scheme2',
    //   preferLocalhost: true,
    //   isTripleSlashed: true,
    // });

    const authUrl = 'https://example.com/login'; // Replace with your auth provider's login URL


    console.log('redirectUrl', redirectUrl)
    // Start the auth session
    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

    console.log('result', result)

    if (result.type === 'success') {
      // Captured URL after the user is redirected back to your app
      const { url } = result;

      // Parse the URL to get the token (assuming the token is in a query parameter)
      const urlParams = new URLSearchParams(url.split('?')[1]); // Split URL to get query params
      const token = urlParams.get('token'); // Assuming the token is in the 'token' query parameter
      
      if (token) {
        console.log('Login successful, token:', token);
        // You can now store the token or use it as needed
      } else {
        console.log('Token not found in URL');
      }
    } else {
      console.log('Login cancelled or failed');
    }
  };

  useEffect(() => {
    const handleUrl = (event: any) => {
      console.log("URL changed:", event.url);
      // Perform actions based on the URL, such as navigation or state updates
    };

    // Add event listener to monitor for URL changes
    const subscription = Linking.addEventListener('url', handleUrl);

    // Clean up the event listener when the component is unmounted
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <TouchableOpacity style={[defaultStyles.btn, styles.btnLight]} onPress={authHandler}>
        <Ionicons name="logo-apple" size={14} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]}>
        <Ionicons name="logo-google" size={16} style={styles.btnIcon} color={'#fff'} />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: '/login',
          params: { type: 'register' },
        }}
        style={[defaultStyles.btn, styles.btnDark]}
        asChild>
        <TouchableOpacity>
          <Ionicons name="mail" size={20} style={styles.btnIcon} color={'#fff'} />
          <Text style={styles.btnDarkText}>Sign up with email</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{
          pathname: '/login',
          params: { type: 'login' },
        }}
        style={[defaultStyles.btn, styles.btnOutline]}
        asChild>
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log in</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnLightText: {
    color: '#000',
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
  btnIcon: {
    paddingRight: 6,
  },
});
export default BottomLoginSheet;
