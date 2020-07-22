import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";
import PalettePreview from "../components/PalettPreview";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation, route }) => {
    const isFocus = useIsFocused();

    const newColorPalette = route.params ? route.params.newColorPalette : undefined;
    const [colorPalettes, setColorPalettes] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchColorPalettes = useCallback(async () => {
        const result = await fetch("https://color-palette-api.kadikraman.now.sh/palettes");
        if (result.ok) {
            const palettes = await result.json();
            setColorPalettes(palettes)
        }
    }, []);

    useEffect(() => {
        fetchColorPalettes();
    }, []);

    const handelRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchColorPalettes();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000);
    }, [])

    useEffect(() => {
        if (newColorPalette) {
            setColorPalettes(palettes => [newColorPalette, ...palettes])
        }
    }, [newColorPalette]);


    return (
        <FlatList
            style={styles.list}
            data={colorPalettes}
            keyExtractor={item => item.paletteName}
            renderItem={({ item }) => (
                <PalettePreview
                    handelPress={() => {
                        navigation.navigate('ColorPalette', item)
                    }}
                    colorPalette={item}
                />
            )}
            refreshing={isRefreshing}
            onRefresh={handelRefresh}
            ListHeaderComponent={
                <TouchableOpacity onPress={() => {
                    navigation.navigate("ColorPaletteModal")
                }}>
                    <Text style={styles.buttonText}>Add a color scheme</Text>
                </TouchableOpacity>
            }
        />
    )
}

const styles = StyleSheet.create({
    list: {
        padding: 10,
        backgroundColor: 'white',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'teal',
        marginBottom: 10
    }
})

export default Home;