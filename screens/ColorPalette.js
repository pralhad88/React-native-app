import React from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import ColorBox from "../components/ColorBox";

const COLORS = [
    { colorName: 'Base03', hexCode: '#002b36' },
    { colorName: 'Base02', hexCode: '#073642' },
    { colorName: 'Base01', hexCode: '#586e75' },
    { colorName: 'Base00', hexCode: '#657b83' },
    { colorName: 'Base0', hexCode: '#839496' },
    { colorName: 'Base1', hexCode: '#93a1a1' },
    { colorName: 'Base2', hexCode: '#eee8d5' },
    { colorName: 'Base3', hexCode: '#fdf6e3' },
    { colorName: 'Yellow', hexCode: '#b58900' },
    { colorName: 'Orange', hexCode: '#cb4b16' },
    { colorName: 'Red', hexCode: '#dc322f' },
    { colorName: 'Magenta', hexCode: '#d33682' },
    { colorName: 'Violet', hexCode: '#6c71c4' },
    { colorName: 'Blue', hexCode: '#268bd2' },
    { colorName: 'Cyan', hexCode: '#2aa198' },
    { colorName: 'Green', hexCode: '#859900' },
];

const ColorPalette = ({ route }) => {
    const { colors, paletteName } = route.params;
    return (
        <FlatList
            style={styles.container}
            data={colors}
            keyExtractor={item => item.colorName} // if in data key is exist then no need to KeyExtractore props.
            renderItem={({ item }) => (<ColorBox
                colorName={item.colorName}
                hexCode={item.hexCode}
            />)}
            ListHeaderComponent={<Text style={styles.Text}>{paletteName}</Text>}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ColorPalette;