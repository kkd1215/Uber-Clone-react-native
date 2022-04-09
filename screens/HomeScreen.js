import React from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { setDestination, setOrigin } from '../slices/navSlice';

import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';

import GlobalStyles from '../GlobalStyles';
import { useDispatch } from 'react-redux';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={[tw`bg-white h-full`, GlobalStyles.droidSafeArea]}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100, height: 100, resizeMode: 'contain'
                    }}
                    source={{
                        uri: "https://links.papareact.com/gzs"
                    }}
                />
                <GooglePlacesAutocomplete
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en",
                    }}
                    placeholder="Where From?"
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    enablePoweredByContainer={false}
                    minLength={2}
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))

                        dispatch(setDestination(null))
                    }}

                />
                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})