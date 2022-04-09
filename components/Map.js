import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';

import { GOOGLE_MAPS_APIKEY } from '@env';
import { selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice'

const Map = () => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef();

    useEffect(() => {
        if (!origin || !destination) return;
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            animated: true,
            edgePadding: {
                top: 80,
                right: 50,
                bottom: 50,
                left: 50,
            }
        })
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;
        const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`;
        const fetchData = async () => {
            fetch(URL)
            .then((res) => res.json())
            .then(data => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
        }
        fetchData();
    }, [origin, destination, GOOGLE_MAPS_APIKEY])
    

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >

            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={4}
                    strokeColor="black"
                />
            )}
            {origin?.location && (<Marker
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="Origin"
                description={origin.description}
                identifier="origin"
            />)}

            {destination?.location && (<Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title="Destination"
                description={destination.description}
                identifier="destination"
            />)}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})