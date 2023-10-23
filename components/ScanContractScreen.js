// Import af nødvendige moduler fra React og React Native
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Button, Image, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// Definition af funktionel komponent CameraScreen
const CameraScreen = ({ navigation }) => {
    // Oprettelse af referencer og state-variabler ved hjælp af hooks
    const cameraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [imagesArr, setImagesArr] = useState([]);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [loading, setLoading] = useState(false);

    // useEffect-hook til at anmode om kamera- og mediebibliotekstilladelser, når komponenten monteres
    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            // Hvis tilladelser ikke er givet, vis en advarsel
            if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
                alert(<Text>Beklager, vi skal have tilladelser til kamera og mediebibliotek for at dette kan fungere!</Text>);
            }

            // Sæt hasPermission-state baseret på tilladelserne
            setHasPermission(cameraStatus === 'granted' && mediaLibraryStatus === 'granted');
        })();
    }, []);

    // Hvis tilladelse stadig bliver kontrolleret, returner en tom visning
    if (hasPermission === null) {
        return <View />;
    }

    // Hvis tilladelse ikke er givet, vis en besked og en knap for at åbne indstillinger
    if (!hasPermission) {
        return (
            <View style={styles.gallery}>
                <Text>Ingen adgang til kamera</Text>
                <Button title={<Text>Ændre indstillinger</Text>} onPress={() => Linking.openSettings()} />
            </View>
        );
    }

    // Funktion til at tage et billede ved hjælp af kameraet
    const snap = async () => {
        if (!cameraRef.current) {
            return;
        }
        setLoading(true);
        try {
            const result = await cameraRef.current.takePictureAsync();
            setImagesArr((imagesArr) => [result].concat(imagesArr));
        } catch (error) {
            console.error('Fejl ved tagning af billede:', error);
        } finally {
            setLoading(false);
        }
    };

    // Funktionel komponent til at vise galleriet af tagne billeder
    const CameraGallery = () => {
        return (
            <View style={styles.gallery}>
                <Text style={styles.buttonGallery}>Billeder taget: {imagesArr.length}</Text>
                <ScrollView horizontal={true}>
                    {imagesArr.length > 0 ? (
                        imagesArr.map((image, index) => (
                            <TouchableOpacity key={index} style={{ paddingHorizontal: 10 }} onPress={() => navigation.navigate('image', { image: image.uri })}>
                                <Image source={{ uri: image.uri }} style={{ width: 100, height: 200 }} />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={{ color: 'white' }}>Ingen billeder taget</Text>
                    )}
                </ScrollView>
            </View>
        );
    };

    // Funktion til at vælge et billede fra enhedens galleri
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImagesArr((imagesArr) => [result].concat(imagesArr));
        } else {
            // Tilføj en <Text>-komponent her for at indeholde fejlmeddelelsen
            alert(<Text>Noget gik galt ved valg af billede.</Text>);
        }
    };

    // Rendere hovedkomponenten
    return (
        <Fragment>
            <StatusBar style="dark-content" backgroundColor={'rgba(255,255,255,0.4)'} />
            <View style={styles.container}>
                <Camera style={styles.camera} type={type} ref={cameraRef}>
                    <View style={{ alignContent: 'center', flex: 1, padding: 20 }}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
                                <MaterialIcons name="rotate-left" size={32} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={snap}>
                                <Ionicons name={loading ? "ios-hourglass" : "ios-camera"} size={32} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={pickImage}>
                                <Ionicons name="ios-images" size={32} color="white" />
                            </TouchableOpacity>
                        </View>
                        <CameraGallery />
                    </View>
                </Camera>
            </View>
        </Fragment>
    );
};

// Stylesheet til styling af komponenter
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: "space-between",
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    buttonGallery: {
        fontSize: 15,
        color: 'white',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
        padding: 5,
        alignSelf: 'flex-end'
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    gallery: {
        flex: 0.4,
        paddingTop: 20,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    }
});

// Eksporter komponenten til brug i andre filer
export default CameraScreen;
