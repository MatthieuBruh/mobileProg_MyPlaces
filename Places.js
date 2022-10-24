import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from'react-native';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { Button, Input, ListItem } from'react-native-elements';

export default function Places({ navigation }) {
    const firebaseConfig = {
        apiKey: "AIzaSyB3JYFxpJCN4ZgpI4-vyoKQMFTAJKrUDXY",
        authDomain: "shoppinglist-e7466.firebaseapp.com",
        databaseURL: "https://shoppinglist-e7466-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "shoppinglist-e7466",
        storageBucket: "shoppinglist-e7466.appspot.com",
        messagingSenderId: "900782144151",
        appId: "1:900782144151:web:b88f93eb91c186a0b787d2",
        measurementId: "G-W9970HJ8H7"
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const [place, setPlace] = useState('');
    const [places, setPlaces] = useState([]);

    const savePlace = () => {
        if (place !== '' && place !== null) {
            push(
                ref(database, 'myPlaces/'),
                {
                  'address': place,
                }
              );
            setPlace('');
        }        
    }

    const deletePlace = (id) => {
        remove(ref(database, 'myPlaces/' + id));
    }

    useEffect(() => {
        const myPlacesRef = ref(database, 'myPlaces/');
        onValue(myPlacesRef, (snapshot) => {
            const data = snapshot.val();
            const placesFind = Object.keys(data).map((key) => ({
                key: key,
                address: data[key].address,
            }));
            setPlaces(placesFind);
        });
    }, []);

    return(
        <View style={ styles.container }>
            <View style={ styles.newPlaceContainer } >
                <Input
                    label='PLACEFINDER'
                    placeholder='Type in address'
                    containerStyle={{ width: '90%' }}
                    data={place}
                    onChangeText={value => setPlace(value)}
                />
                <Button
                    title="SAVE"
                    onPress={savePlace}
                    containerStyle={{ width: '90%' }}
                    icon={{
                        name:'save', 
                        color: 'white'
                    }}
                />
            </View>

            
            <View style={{ width: '100%', marginTop: 20 }}>
                <FlatList style={{ width: '100%' }}
                    data={places}
                    renderItem={({ item }) => (
                        <ListItem
                            style={styles.ListItem}
                            key={item.key}
                            bottomDivider={true}
                            topDivider={true}
                            onPress={() => navigation.navigate('PlaceMap', { place: item.address })}
                            onLongPress={() => deletePlace(item.key)} >
                            <ListItem.Content style={{ width: '100%' }}>
                                <ListItem.Title>{item.address}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )}
                />

            </View>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    newPlaceContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ListItem: {
        width: '100%',
    }
});