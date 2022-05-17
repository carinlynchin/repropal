import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableHighlight } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from 'assets/constants';
import AnimalsIcon from 'images/comboanimals.svg';
import globalStyles from '/styles';
import NewAnimal from 'screens/NewAnimal';

export default function Animals(props) {
   const [myAnimals, setMyAnimals] = useState([]);

   const AnimalsStack = createNativeStackNavigator();
   const stackOptions = {
      headerStyle: {
         backgroundColor: COLORS.BASEGREEN,
         height: 40,
      },
      headerTitleContainerStyle: {
         paddingBottom: 5,
      },
      headerTitleStyle: {
         color: 'white',
      }
   };

   function AnimalsList() {
      return (
         <View>
            <StatusBar backgroundColor={COLORS.BASEGREEN} />
            { myAnimals.length == 0 &&
               <View style={{flex: 1, alignItems: 'center', paddingVertical: 50}}>
                  <AnimalsIcon style={{marginBottom: 20}}/>
                  <Text style={{color: COLORS.BASEGRAY}}>You have no animals listed. Add some now: </Text>
                  <TouchableHighlight
                      style={[globalStyles.greenButton, {marginTop: 20, width: 100}]}
                      underlayColor={COLORS.PRESSGREEN}
                      onPress={() => props.navigation.navigate('NewAnimal')}
                  >
                      <Text style={[globalStyles.whiteText, globalStyles.fs20]}>Add</Text>
                  </TouchableHighlight>
               </View>
            }
         </View>
      )
   }

   return(
      <AnimalsStack.Navigator>
         <AnimalsStack.Screen
            name="MyAnimals"
            component={AnimalsList}
            options={{
               title: 'My Animals',
               ...stackOptions
            }}
         />
         <AnimalsStack.Screen
            name="NewAnimal"
            component={NewAnimal}
            options={{
               title: 'Enter new animal',
               ...stackOptions
            }}
         />
      </AnimalsStack.Navigator>
   )
}
