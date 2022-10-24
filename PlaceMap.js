import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import MapView, { Marker } from'react-native-maps';


export default function PlaceMap({ route, navigation }) {
    const address = route.params.place;
    const [region, setRegion] = useState({
        name: 'Haaga-Helia',
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });
    
    useEffect(() => {
        let key = 'EAJgHWDo0rpGAnA6kGbhO4GmYnNYNsy7';
        fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address}&maxResults=1`)
        .then(response => response.json())
        .then(res => {
            setRegion({
                ...region,
                name: res.results[0].providedLocation.location,
                latitude: res.results[0].locations[0].latLng.lat,
                longitude: res.results[0].locations[0].latLng.lng
            })
        })
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map} 
                region={region}>
                <Marker
                    title={region.name}
                    coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude
                }}/>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map:{
        ...StyleSheet.absoluteFillObject,
    }
});