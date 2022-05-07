import React, { useState } from 'react';
import { View, FlatList, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from 'assets/constants';
import Cow from 'images/cow-solid.svg';
import Cat from 'images/cat-solid.svg';
import Horse from 'images/horse-solid.svg';
import Dog from 'images/dog-solid.svg';
import PhotoUpload from 'components/PhotoUpload';

export default function NewAnimal () {
   const [selectedAnimal, setSelectedAnimal] = useState();

   const iconOptions = {
      style: {margin:20},
      width:50,
      height: 50,
   };
   const DATA = [
     {
       id: 'bd7acdddbea-c1b1-46c2-aed5-3ad53abb28ba',
       type: Dog,
     },
     {
       id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
       type: Cat,
     },
     {
       id: '5869ddd4a0f-3da1-471f-bd96-145571e29d72',
       type: Horse,
     },
     {
       id: '58694a0f-3da1-471f-bd96-145571e29d72',
       type: Cow,
     },
   ];

   const onSelect = React.useCallback(id => setSelectedAnimal(id), [selectedAnimal]);

   return(
      <View>
         <FlatList
            style={styles.pickAnimal}
            data={DATA}
            horizontal={true}
            renderItem={ ({item}) => (
               React.createElement(item.type, {
                  ...iconOptions,
                  fill: item.id == selectedAnimal ? COLORS.BASEGREEN : COLORS.DISABLEDGRAY,
                  onPress: () => onSelect(item.id)
               }, null)
            )}
            extraData={selectedAnimal}
         />
         <PhotoUpload />
      </View>
   );
}

const styles = StyleSheet.create({
   pickAnimal: {
      marginHorizontal: 50,
   },
})
