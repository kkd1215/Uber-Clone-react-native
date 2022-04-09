import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon, Image } from 'react-native-elements';
import React, { useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTimeTravelInformation } from '../slices/navSlice';

import 'intl';
import 'intl/locale-data/jsonp/en';

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTimeTravelInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-shrink`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon type='font-awesome' name='chevron-left' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, image, multiplier }, item }) => (
          <TouchableOpacity
            style={tw`flex-row items-center px-5 justify-between ${id === selected?.id ? "bg-gray-200" : ''}`}
            onPress={() => setSelected(item)}
          >
            <Image
              style={{
                width: 100, height: 100, resizeMode: 'contain'
              }}
              source={{
                uri: image
              }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {
                new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR'
                }).format((travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier)/2)
              }
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected ? `bg-gray-300` : ''}`}
        >
          <Text style={tw`text-center text-xl text-white`}>{selected?.title ? `Choose ${selected?.title}` : 'Choose a ride'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})