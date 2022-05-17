import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faPaw } from '@fortawesome/free-solid-svg-icons'
import Animals from 'screens/Animals';
import globalStyles from '/styles';
import { COLORS } from 'assets/constants';

const Tab = createBottomTabNavigator();

export default function Home() {
   const [user, setUser] = useState(auth().currentUser);

   function Dashboard() {
      return (
         <View style={globalStyles.baseBackground}>
            <Text>Welcome {user.displayName}</Text>
         </View>
      );
   }

   return (
      <Tab.Navigator
         screenOptions={{
            activeTintColor: COLORS.BASEGREEN,
            inactiveTintColor: COLORS.BASEGRAY,
         }}
      >
         <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
               title: 'Dashboard',
               tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faHome} style={{color: color}} size={size} />
               )
            }}
         />
         <Tab.Screen
            name="Animals"
            component={Animals}
            options={{
               title: 'Animals',
               tabBarIcon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faPaw} style={{color: color}} size={size} />
               )
            }}
         />
      </Tab.Navigator>
   );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: COLORS.BASEBLUE, //'#06395A', //0A4267
    }
});
