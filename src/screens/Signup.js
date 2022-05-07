import React, {useState, useEffect} from 'react';
import { View, TextInput, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import Logo from 'assets/images/logo.svg';
import globalStyles from '/styles';

export default function Signup({navigation, route}) {
   const [initLoad, setInitLoad] = useState(true);
   const [form, setForm] = useState({
      firstName: '',
      lastName: '',
      email: '',
      pword: '',
      confirmPword: '',
   });
   const [formErrs, setFormErrs] = useState({
      emailErr: '',
      pwordErr: '',
      confirmErr: '',
   });

   const isFormValid = () => {
      return formErrs.emailErr == '' && formErrs.pwordErr == '' && formErrs.confirmErr == '' &&
             form.email.length > 0 && form.pword.length > 0;
   }

   const updateField = (value, name) => {
      if (initLoad) setInitLoad(false);
      setForm ({
         ...form,
         [name]: value
      });
   };

   useEffect(
      () => {
         if (form.pword != form.confirmPword) setFormErrs({...formErrs, confirmErr: 'Passwords don\'t match'});
         else setFormErrs({...formErrs, confirmErr: ''});
      },
      [form.pword, form.confirmPword]
   );

   useEffect(
      () => {
         if (!initLoad && form.email.length == 0) setFormErrs({...formErrs, emailErr: 'Email is required.'});
         else setFormErrs({...formErrs, emailErr: ''});
      },
      [form.email]
   )

   const makeFirstUppercase = (word) => word.replace(/^\w/, (c) => c.toUpperCase());

   async function EmailPasswordSignin(args) {
      if (!isFormValid()) return;

      auth()
         .createUserWithEmailAndPassword(form.email, form.pword)
         .then((userCreds) => {
            userCreds.user.updateProfile({ displayName: makeFirstUppercase(form.firstName) })
               .then(() => {
                  userCreds.user.sendEmailVerification({
                        url: 'https://repropal-39eb6.firebaseapp.com/__/auth/action',
                        android: {
                           installApp: true,
                           packageName: 'com.repropal',
                        }
                     })
                     .then(() => {
                        // TODO: add to user table
                        navigation.navigate('Home');
                     });
               });
         })
         .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
               setFormErrs({...formErrs, emailErr: 'That email address is already in use!'});
            }
            else if (error.code === 'auth/invalid-email') {
               setFormErrs({...formErrs, emailErr: 'That email address is invalid!'});
            }
            else if (error.code == 'auth/weak-password') {
               setFormErrs({...formErrs, pwordErr: 'Password should be at least 6 characters'});
            }
            else
               setFormErrs({...formErrs, emailErr: error.message});
         });
    }

    return (
      <View style={styles.container}>
         <Logo/>
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='First Name'
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={e => updateField(e, 'firstName')}
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='Last Name'
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={e => updateField(e, 'lastName')}
         />
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='Email Address'
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={e => updateField(e, 'email')}
         />
         { formErrs.emailErr != '' &&
            <Text style={globalStyles.formError}>
               {formErrs.emailErr}
            </Text>
         }
         <TextInput
            underlineColorAndroid="transparent"
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor='#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType='next'
            onChangeText={e => updateField(e, 'pword')}
         />
         { formErrs.pwordErr != '' &&
            <Text style={globalStyles.formError}>
               {formErrs.pwordErr}
            </Text>
         }
         <TextInput
            underlineColorAndroid="transparent"
            placeholder = 'Confirm Password'
            secureTextEntry={true}
            placeholderTextColor = '#fff'
            style={[styles.login, globalStyles.input, globalStyles.whiteText, {borderWidth: 0}]}
            returnKeyType = 'next'
            onChangeText={e => updateField(e, 'confirmPword')}
         />
         { formErrs.confirmErr != '' &&
            <Text style={globalStyles.formError}>
               {formErrs.confirmErr}
            </Text>
         }
         <TouchableHighlight
            style = {[styles.login, globalStyles.greenButton, !isFormValid() && globalStyles.disabled]}
            underlayColor = {'hsl(56, 45%, 55%)'}
            onPress={() => EmailPasswordSignin()}
            disabled= {!isFormValid()}
         >
            <Text style={[globalStyles.whiteText, globalStyles.fs20]}>Signup</Text>
         </TouchableHighlight>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A4267' //0B4D78
    },
    logo: {
        width: 300
    },
    login: {
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    link: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginTop: 8
    },
});
