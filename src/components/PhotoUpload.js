import React, { useState } from 'react';
import { View,  Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import { COLORS } from 'assets/constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CameraRoll from "@react-native-community/cameraroll";

export default function PhotoUpload () {
   const checkAndroidPermission = async () => {
      const read = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const write =  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      const granted = PermissionsAndroid.RESULTS.GRANTED;

      //    return Promise.reject('You have to allow both camera and gallery access in order to use this.');

      let canReadWrite = await PermissionsAndroid.check(read).then(perm => {
        if (!perm) {
          return PermissionsAndroid.requestMultiple([read, write]).then(ans => ans[read] == granted && ans[write] == granted);
        }
        return perm;
      });

      if (canReadWrite) return Promise.resolve(granted);
      else return Promise.reject("You must give permission to use this feature.");
   };

   const addPhoto = () => {
      if (Platform.OS === 'android'){
         checkAndroidPermission()
           .then((v) => {
             if (v == granted) {
               //TODO add in for IOS too
               CameraRoll.getPhotos()
               .then(r => {
                  debugger
                  this.setState({ photos: r.edges });
               })
               .catch((err) => {
                  debugger
                  //Error Loading Images
               });
             }
           })
           .catch(err => {
             Alert.alert(
              "Permissions Required",
              err,
             );
           });
      }
   };

   return(
      <View style={{alignItems: 'center', marginTop: 15}}>
         <TouchableOpacity
            style={styles.addButton}
            onPress={() => addPhoto()}
         >
            <FontAwesomeIcon icon={faPlus} style={styles.add} size={ 50 } />
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.DISABLEDGRAY,
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  add: {
    color: COLORS.DISABLEDGRAY,
  }
})
