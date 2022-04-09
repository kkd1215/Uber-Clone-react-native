import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from "twrnc";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env'

import GlobalStyles from '../GlobalStyles';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[tw`bg-white flex-1`, GlobalStyles.droidSafeArea]}>
            <Text style={tw`text-center text-lg`}>Good Morning, Karan</Text>
            <View >
                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            backgroundColor: "white",
                            paddingTop: 20,
                            flex: 0,
                        },
                        textInput: {
                            backgroundColor: "#DDDDDF",
                            borderRadius: 0,
                            fontSize: 18,
                        },
                        textInputContainer: {
                            paddingHorizontal: 20,
                            paddingBottom: 0,
                        },
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en",
                    }}
                    placeholder="Where to?"
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    enablePoweredByContainer={false}
                    minLength={2}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description
                        }));
                        navigation.navigate('RideOptionsCard')
                    }}

                />
            </View>

            <NavFavourites />
            <View style={tw`flex-row bg-white justify-evenly py-3 mt-auto border-t border-gray-100`}>
                <TouchableOpacity
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                    onPress={() => navigation.navigate('RideOptionsCard')}
                >
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
                >
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const styles = StyleSheet.create({})