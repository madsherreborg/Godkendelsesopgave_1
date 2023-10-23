import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Funktion til at generere et tilfældigt virksomhedsnavn
const genererTilfældigtNavn = () => {
    const præfikser = ['Nordic', 'Global', 'Tech', 'Innovative', 'Dynamic'];
    const suffikser = ['Solutions', 'Enterprises', 'Consulting', 'Labs', 'Ventures'];
    const tilfældigtPræfiks = præfikser[Math.floor(Math.random() * præfikser.length)];
    const tilfældigtSuffiks = suffikser[Math.floor(Math.random() * suffikser.length)];
    return `${tilfældigtPræfiks} ${tilfældigtSuffiks}`;
};

// Funktion til at generere et tilfældigt emne for kontrakten
const genererTilfældigtEmne = () => {
    const emner = ['Softwareudvikling', 'Marketingkampagne', 'Finansiel rådgivning', 'Produktlancering', 'IT-support'];
    return emner[Math.floor(Math.random() * emner.length)];
};

// Funktion til at generere en tilfældig status for kontrakten (Aktiv eller Inaktiv)
const genererTilfældigStatus = () => {
    const statusser = ['Aktiv', 'Inaktiv'];
    return statusser[Math.floor(Math.random() * statusser.length)];
};

// Funktion til at generere en tilfældig beskrivelse for kontrakten
const genererTilfældigeDetaljer = () => {
    // Erstat denne tekst med en tilpasset beskrivelse baseret på dine krav
    return 'Beskrivelse af kontrakten';
};

// Funktion til at generere et array af tilfældige kontrakter
const genererTilfældigeKontrakter = (antal) => {
    const kontrakter = [];
    for (let i = 1; i <= antal; i++) {
        const status = genererTilfældigStatus();
        kontrakter.push({
            id: `${i}`,
            virksomhed: genererTilfældigtNavn(),
            emne: genererTilfældigtEmne(),
            detaljer: genererTilfældigeDetaljer(),
            status: status,
        });
    }

    // Sorter kontrakter, så aktive kontrakter vises først
    kontrakter.sort((a, b) => {
        if (a.status === 'Aktiv' && b.status === 'Inaktiv') {
            return -1; // Flyt 'Aktiv'-kontrakter før 'Inaktiv'-kontrakter
        } else if (a.status === 'Inaktiv' && b.status === 'Aktiv') {
            return 1; // Flyt 'Inaktiv'-kontrakter efter 'Aktiv'-kontrakter
        } else {
            return 0; // Ingen ændring i rækkefølge
        }
    });

    return kontrakter;
};

// Generer et array af tilfældige kontrakter
const kontrakterData = genererTilfældigeKontrakter(5); // Du kan justere antallet efter behov

function KontrakterScreen() {
    // Funktion til at rendere hvert kontraktelement
    const renderKontraktElement = ({ item }) => (
        <View style={styles.kontraktElement}>
            <Ionicons name="md-document" size={32} color="#007AFF" style={styles.ikon} />
            <View style={styles.kontraktDetaljer}>
                <Text style={styles.kontraktNavn}>{item.virksomhed}</Text>
                <Text style={styles.kontraktEmne}>{item.emne}</Text>
                <Text>{item.detaljer}</Text>
                <View style={styles.statusLinje}>
                    <Text>Status: {item.status}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.beholder}>
            <Text style={styles.overskrift}>Kontrakter</Text>
            <FlatList
                data={kontrakterData}
                renderItem={renderKontraktElement}
                keyExtractor={(item) => item.id}
                style={styles.kontraktListe}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    beholder: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 16,
    },
    overskrift: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    kontraktListe: {
        width: '100%',
    },
    kontraktElement: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,
    },
    ikon: {
        marginRight: 16,
    },
    kontraktDetaljer: {
        flex: 1,
    },
    kontraktNavn: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    kontraktEmne: {
        color: '#777',
        marginBottom: 8,
    },
    statusLinje: {
        marginTop: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
});

export default KontrakterScreen;
