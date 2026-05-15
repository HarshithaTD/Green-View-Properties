import { SafeAreaViewBase, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardScreen from './src/screens/DashboardScreen';
import AppNavigator from './src/navigation/AppNavigator';

import {Provider} from 'react-redux';

import {store} from './src/redux/store';
import CreateAccountScreen from './src/screens/CreateAccountScreen';

const App = () => {
  return (
   <Provider store={store} >
      <AppNavigator />
    </Provider>

  
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});














// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';

// import auth from '@react-native-firebase/auth';

// const App = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [confirm, setConfirm] = useState<any>(null);
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Send OTP
//   const signInWithPhoneNumber = async () => {
//   if (!phoneNumber) {
//     Alert.alert('Enter phone number');
//     return;
//   }

//   try {
//     setLoading(true);

//     const formattedPhone =
//       phoneNumber.startsWith('+')
//         ? phoneNumber
//         : `+91${phoneNumber}`;

//     const confirmation =
//       await auth().signInWithPhoneNumber(
//         formattedPhone,
//       );

//     setConfirm(confirmation);

//     Alert.alert('OTP Sent');
//   } catch (error: any) {
//     console.log(error);

//     Alert.alert(
//       'Error',
//       error.message,
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   // Verify OTP
//   const confirmCode = async () => {
//     try {
//       setLoading(true);

//       await confirm.confirm(code);

//       Alert.alert('Login Successful');
//     } catch (error: any) {
//       Alert.alert('Invalid OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Firebase OTP Login
//       </Text>

//       {!confirm ? (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="+91 9876543210"
//             placeholderTextColor="#999"
//             keyboardType="phone-pad"
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//           />

//           <TouchableOpacity
//             style={styles.button}
//             onPress={signInWithPhoneNumber}>
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>
//                 Send OTP
//               </Text>
//             )}
//           </TouchableOpacity>
//         </>
//       ) : (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter OTP"
//             placeholderTextColor="#999"
//             keyboardType="number-pad"
//             value={code}
//             onChangeText={setCode}
//           />

//           <TouchableOpacity
//             style={styles.button}
//             onPress={confirmCode}>
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>
//                 Verify OTP
//               </Text>
//             )}
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FB',
//     justifyContent: 'center',
//     padding: 24,
//   },

//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 40,
//     textAlign: 'center',
//   },

//   input: {
//     height: 58,
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },

//   button: {
//     height: 58,
//     backgroundColor: '#4F46E5',
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '700',
//   },
// });






// import React, {useEffect, useState} from 'react';

// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';

// import auth from '@react-native-firebase/auth';

// const App = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] =
//     useState('');

//   const [user, setUser] = useState<any>(null);

//   const [loading, setLoading] =
//     useState(false);

//   // Check Auth State
//   useEffect(() => {
//     const subscriber =
//       auth().onAuthStateChanged(user => {
//         setUser(user);
//       });

//     return subscriber;
//   }, []);

//   // Register User
//   const register = async () => {
//     if (!email || !password) {
//       Alert.alert(
//         'Error',
//         'Enter email & password',
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       await auth().createUserWithEmailAndPassword(
//         email,
//         password,
//       );

//       Alert.alert(
//         'Success',
//         'Account Created',
//       );
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login User
//   const login = async () => {
//     if (!email || !password) {
//       Alert.alert(
//         'Error',
//         'Enter email & password',
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       await auth().signInWithEmailAndPassword(
//         email,
//         password,
//       );

//       Alert.alert(
//         'Success',
//         'Login Successful',
//       );
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout
//   const logout = async () => {
//     await auth().signOut();
//   };

//   // Home Screen
//   if (user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>
//           Welcome
//         </Text>

//         <View style={styles.card}>
//           <Text style={styles.label}>
//             Email
//           </Text>

//           <Text style={styles.value}>
//             {user.email}
//           </Text>

//           <Text style={styles.label}>
//             UID
//           </Text>

//           <Text style={styles.value}>
//             {user.uid}
//           </Text>
//         </View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={logout}>
//           <Text style={styles.buttonText}>
//             Logout
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // Login/Register Screen
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Firebase Auth
//       </Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Email"
//         placeholderTextColor="#999"
//         autoCapitalize="none"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Password"
//         placeholderTextColor="#999"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={login}>
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>
//             Login
//           </Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.button,
//           {marginTop: 15},
//         ]}
//         onPress={register}>
//         <Text style={styles.buttonText}>
//           Register
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FB',
//     justifyContent: 'center',
//     padding: 24,
//   },

//   title: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 40,
//     textAlign: 'center',
//   },

//   input: {
//     height: 58,
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },

//   button: {
//     height: 58,
//     backgroundColor: '#4F46E5',
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '700',
//   },

//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 20,
//     marginBottom: 30,
//     elevation: 5,
//   },

//   label: {
//     fontSize: 14,
//     fontWeight: '700',
//     marginTop: 10,
//     color: '#555',
//   },

//   value: {
//     fontSize: 16,
//     marginTop: 5,
//     color: '#111',
//   },
// });