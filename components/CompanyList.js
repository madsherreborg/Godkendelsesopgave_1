import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                // Begræns antallet af virksomheder til 10 og tildel opgaver til hver virksomhed.
                const limitedData = data.slice(0, 10).map((item, index) => ({
                    ...item,
                    tasks: index < 5 ? 12 : Math.floor(Math.random() * 12), // Første 5 virksomheder får 12 opgaver, de øvrige får tilfældige antal opgaver op til 12.
                }));
                setCompanies(limitedData);
            } catch (error) {
                console.error('Fejl ved hentning af virksomheder:', error);
            }
        };

        fetchCompanies();
    }, []);

    const generateRandomImage = () => {
        // Tilfældigt genereret URL til billede fra Lorem Picsum.
        return `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/200/200`;
    };

    const generateRandomCompany = () => {
        // Simpel funktion til at generere fiktive firmanavne.
        const adjectives = ['Awesome', 'Creative', 'Innovative', 'Tech', 'Global'];
        const nouns = ['Solutions', 'Services', 'Group', 'Systems', 'Co'];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${adjective} ${noun}`;
    };

    const generateRandomDescription = () => {
        // Simpel funktion til at generere fiktive beskrivelser.
        const descriptions = [
            'En innovativ tech-virksomhed',
            'Specialiseret i kreative løsninger',
            'Globalt servicefirma',
            'Leder inden for innovative løsninger',
            'Eksperter i forretningsstrategier',
        ];
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        return descriptions[randomIndex];
    };

    // Sorter virksomhederne efter antallet af opgaver (flest først)
    companies.sort((a, b) => b.tasks - a.tasks);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Virksomheder</Text>
            <FlatList
                data={companies}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.companyCard}>
                        <Image
                            source={{ uri: generateRandomImage() }} // Brug Lorem Picsum til at generere logoer
                            style={styles.companyImage}
                        />
                        <View>
                            <Text style={styles.companyName}>{generateRandomCompany()}</Text>
                            <Text style={styles.companyDescription}>{generateRandomDescription()}</Text>
                            <Text style={styles.companyTasks}>Opgaver: {item.tasks}</Text>
                            <TouchableOpacity
                                style={styles.detailsButton}
                                onPress={() => {
                                    // Implementer logikken for at vise detaljer for virksomheden her.
                                    alert(`Detaljer for virksomhed: ${generateRandomCompany()}`);
                                }}>
                                <Text style={styles.detailsButtonText}>Se detaljer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    companyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    companyImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    companyDescription: {
        fontSize: 14,
        color: '#555',
    },
    companyTasks: {
        fontSize: 14,
    },
    detailsButton: {
        marginTop: 8,
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 4,
        width: 100, // Fastsæt knappens bredde her
        alignItems: 'center', // Centrer tekst inden i knappen
    },
    detailsButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default CompanyList;
