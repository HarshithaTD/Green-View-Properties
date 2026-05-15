// // src/screens/auth/LoginScreen.tsx

// import React, {useEffect, useState} from 'react';

// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   TextInput,
// } from 'react-native';

// import Feather from 'react-native-vector-icons/Feather';

// import {useNavigation, useRoute} from '@react-navigation/native';

// import AppLogo from '../AppLogo';
// import CustomButton from '../CustomButton';

// import {
//   scale,
//   verticalScale,
//   moderateScale,
//   fontScale,
// } from '../../utils/responsive';

// export default function LoginScreen() {
//   const navigation = useNavigation<any>();

//   const route = useRoute<any>();

//   const phone =
//     route?.params?.phone || '98765 43210';

//   const [otp, setOtp] = useState('');

//   const [timer, setTimer] = useState(28);

//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer(prev => prev - 1);
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [timer]);

//   const isOtpValid = otp.length === 6;

//   return (
//     <View style={styles.container}>
//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={
//           Platform.OS === 'ios'
//             ? 'padding'
//             : undefined
//         }>
//         <View style={styles.content}>
//           {/* Logo */}
//           <AppLogo />

//           {/* Heading */}
//           <View style={styles.headingContainer}>
//             <Text style={styles.heading}>
//               Welcome Back!
//             </Text>

//             <Text style={styles.subHeading}>
//               Login to continue
//             </Text>
//           </View>

//           {/* Phone Label */}
//           <Text style={styles.label}>
//             Mobile Number
//           </Text>

//           {/* Phone Card */}
//           <View style={styles.phoneCard}>
//             <View style={styles.leftRow}>
//               <Text style={styles.flag}>
//                 🇮🇳
//               </Text>

//               <Feather
//                 name="chevron-down"
//                 size={scale(14)}
//                 color="#555"
//               />

//               <Text style={styles.phoneText}>
//                 +91 {phone}
//               </Text>
//             </View>

//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() =>
//                 navigation.navigate(
//                   'CreateAccount',
//                 )
//               }>
//               <Text style={styles.changeText}>
//                 Change
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* OTP */}
//           <Text style={styles.label}>
//             Enter OTP
//           </Text>

//           <TextInput
//             value={otp}
//             onChangeText={setOtp}
//             placeholder="Enter 6-digit OTP"
//             placeholderTextColor="#999"
//             keyboardType="number-pad"
//             maxLength={6}
//             style={styles.otpInput}
//           />

//           {/* Timer */}
//           <View style={styles.timerRow}>
//             <Text style={styles.timerText}>
//               Resend OTP in{' '}
//             </Text>

//             <Text style={styles.timer}>
//               00:
//               {timer < 10
//                 ? `0${timer}`
//                 : timer}
//             </Text>
//           </View>

//           {/* Login Button */}
//           <CustomButton
//             title="Login"
//             onPress={() =>
//               navigation.navigate(
//                 'Dashboard',
//               )
//             }
//           />

//           {/* Divider */}
//           <View style={styles.dividerRow}>
//             <View style={styles.line} />

//             <Text style={styles.orText}>
//               or
//             </Text>

//             <View style={styles.line} />
//           </View>

//           {/* Google Button */}
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.googleButton}>
//             <Text style={styles.googleIcon}>
//               G
//             </Text>

//             <Text style={styles.googleText}>
//               Login with Google
//             </Text>
//           </TouchableOpacity>

//           {/* Bottom */}
//           <View style={styles.bottomRow}>
//             <Text style={styles.bottomText}>
//               Don’t have an account?
//             </Text>

//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate(
//                   'CreateAccount',
//                 )
//               }>
//               <Text style={styles.registerText}>
//                 Register
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: '#FFFFFF',
//   },

//   content: {
//     flex: 1,

//     paddingHorizontal: scale(24),

//     paddingTop: verticalScale(18),
//   },

//   headingContainer: {
//     marginTop: verticalScale(25),
//   },

//   heading: {
//     fontSize: fontScale(30),

//     fontWeight: '800',

//     color: '#111111',
//   },

//   subHeading: {
//     marginTop: verticalScale(8),

//     fontSize: fontScale(15),

//     color: '#777777',
//   },

//   label: {
//     marginTop: verticalScale(28),

//     marginBottom: verticalScale(10),

//     fontSize: fontScale(15),

//     fontWeight: '600',

//     color: '#111',
//   },

//   phoneCard: {
//     height: verticalScale(58),

//     borderWidth: 1,

//     borderColor: '#E5E5E5',

//     borderRadius: moderateScale(14),

//     paddingHorizontal: scale(14),

//     flexDirection: 'row',

//     justifyContent: 'space-between',

//     alignItems: 'center',

//     backgroundColor: '#fff',
//   },

//   leftRow: {
//     flexDirection: 'row',

//     alignItems: 'center',
//   },

//   flag: {
//     fontSize: fontScale(20),

//     marginRight: scale(6),
//   },

//   phoneText: {
//     marginLeft: scale(10),

//     fontSize: fontScale(15),

//     fontWeight: '600',

//     color: '#111',
//   },

//   changeText: {
//     color: '#0E9F4B',

//     fontWeight: '700',

//     fontSize: fontScale(13),
//   },

//   otpInput: {
//     height: verticalScale(56),

//     borderWidth: 1,

//     borderColor: '#E5E5E5',

//     borderRadius: moderateScale(14),

//     paddingHorizontal: scale(16),

//     fontSize: fontScale(15),

//     color: '#111',

//     backgroundColor: '#fff',
//   },

//   timerRow: {
//     flexDirection: 'row',

//     justifyContent: 'flex-end',

//     marginTop: verticalScale(16),
//   },

//   timerText: {
//     fontSize: fontScale(13),

//     color: '#666',
//   },

//   timer: {
//     fontSize: fontScale(13),

//     color: '#0E9F4B',

//     fontWeight: '700',
//   },

//   dividerRow: {
//     flexDirection: 'row',

//     alignItems: 'center',

//     marginTop: verticalScale(32),
//   },

//   line: {
//     flex: 1,

//     height: 1,

//     backgroundColor: '#E5E5E5',
//   },

//   orText: {
//     marginHorizontal: scale(14),

//     color: '#777',

//     fontSize: fontScale(13),
//   },

//   googleButton: {
//     marginTop: verticalScale(24),

//     height: verticalScale(56),

//     borderWidth: 1,

//     borderColor: '#E5E5E5',

//     borderRadius: moderateScale(14),

//     flexDirection: 'row',

//     justifyContent: 'center',

//     alignItems: 'center',

//     backgroundColor: '#fff',
//   },

//   googleIcon: {
//     fontSize: fontScale(22),

//     fontWeight: '700',

//     color: '#EA4335',

//     marginRight: scale(12),
//   },

//   googleText: {
//     fontSize: fontScale(15),

//     fontWeight: '600',

//     color: '#111',
//   },

//   bottomRow: {
//     flexDirection: 'row',

//     justifyContent: 'center',

//     alignItems: 'center',

//     marginTop: verticalScale(40),
//   },

//   bottomText: {
//     color: '#666',

//     fontSize: fontScale(14),
//   },

//   registerText: {
//     marginLeft: scale(6),

//     color: '#0E9F4B',

//     fontSize: fontScale(14),

//     fontWeight: '700',
//   },
// });