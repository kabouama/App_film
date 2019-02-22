import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'

class Search extends React.Component {
    render() {
        return (
         <View style={styles.main_container}>
             <TextInput style={styles.TextInput} placeholder="Titre du film"/>
             <Button title="Rechercher" onPress={() => {}}/>
             
             <FlatList
                data={films} //Données que l'on souhaite afficher
                keyExtractor={(item) => item.id.toString()} //React-native demande obligatoirement une key pr une liste
                renderItem={({item}) => <FilmItem/>} //Rendu des données de notre list
             />
         </View>   
        )
    }
}

const styles = StyleSheet.create ({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    TextInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: 'blue',
        borderWidth: 1,
        paddingLeft: 5
    }
})

export default Search