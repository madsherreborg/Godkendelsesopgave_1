import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

function ConsultantsList() {
    const [consultants, setConsultants] = useState([]);
    const apiUrl = 'https://randomuser.me/api/?results=10'; // Ændre antallet af resultater efter behov

    // Funktion til at hente konsulentdata fra API'en
    const fetchConsultants = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const results = data.results.map((result, index) => ({
                id: index.toString(),
                username: `${result.name.first} ${result.name.last}`,
                imageUrl: result.picture.large,
                skills: generateRandomSkills(), // Ændre dette til din måde at hente færdigheder på
            }));
            setConsultants(results);
        } catch (error) {
            console.error('Fejl ved hentning af data:', error);
        }
    };

    useEffect(() => {
        // Kald funktionen til at hente konsulentdata ved opstart
        fetchConsultants();
    }, []);

    // Generer tilfældige færdigheder (ændr dette efter behov)
    const generateRandomSkills = () => {
        const skills = ['Webudvikling', 'Appudvikling', 'Grafisk design', 'Projektledelse', 'Kommunikation'];
        const numSkills = Math.floor(Math.random() * skills.length) + 1;
        const randomSkills = [];

        for (let i = 0; i < numSkills; i++) {
            const randomIndex = Math.floor(Math.random() * skills.length);
            randomSkills.push(skills[randomIndex]);
            skills.splice(randomIndex, 1);
        }

        return randomSkills;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={consultants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.consultantCard}>
                        <Image source={{ uri: item.imageUrl }} style={styles.avatar} />
                        <View style={styles.details}>
                            <Text style={styles.username}>{item.username}</Text>
                            {item.skills && (
                                <Text style={styles.skills}>
                                    {item.skills.length > 0 ? item.skills.join(', ') : 'Ingen færdigheder tilgængelige'}
                                </Text>
                            )}
                            <TouchableOpacity
                                style={styles.detailsButton}
                                onPress={() => {
                                    // Tilføj logik til at navigere til konsulentens detaljevisning her
                                    // F.eks. navigation.navigate('ConsultantDetail', { consultant: item });
                                }}
                            >
                                <Text style={styles.detailsButtonText}>Se detaljer</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    consultantCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    skills: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    detailsButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
    },
    detailsButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ConsultantsList;
