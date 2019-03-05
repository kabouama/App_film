import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import films from '../Helpers/filmsData' // notre props qu'on va envoyer dans filmItem
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'
import FilmList from './FilmList';

class Search extends React.Component {

    constructor(props) { //comment les component font passer des props les uns entre les autres
        super(props) // on reecri le constructeur de notre component 'search'
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        // Ici on va créer les propriétés de notre component custom Search
        this.state = { //la state de notre component est utiliser pr stocker qlq infos de l'api
            films: [],
            isLoading: false
        } // on definit notre state avec un tableau de film

        this._loadFilms = this._loadFilms.bind(this)
        this._searchFilms = this._searchFilms.bind(this)
        //Ca permet de binder une fonction pour l'utiliser dans d'autres component et qu'elle garde sa valeur
    }

    _loadFilms() { // fonction qu'on va appeler qd on clic sur recherche donc dans -> onpress
        if (this.searchedText.length > 0) {//on check si on a bien ecrit quelque chose
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({ 
//                    films : data.results,
                    films: [ ...this.state.films, ...data.results],
                    isLoading: false
                })
            })
            // setState permet de modifier notre state tout en rechargeant notre component
            // on modifie toujours le state avec setState
    }
}

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: [],
        }, () => {
            this._loadFilms()
        })
      }

    /*_displayDetailForFilm = (idFilm) => { //fonction prend en param idFilm /-> (sythaxe tres bizarre)
        //console.log("display film with id" + idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }*/
    
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render() {
        //console.log("display film with id" + this.idFilm)
        //console.log(this.props)
        return (
         <View style={styles.main_container}>
            <TextInput  
                style={styles.TextInput}
                placeholder="Titre du film"
                onChangeText={(text) => this._searchTextInputChanged(text)}                                                 
                onSubmitEditing={() => this._searchFilms()}
            />             
            <Button title="Rechercher" onPress={() => this._searchFilms()}/>
             
            <FilmList
                films={this.state.films} /* C'est bien le component Search qui récupère les
                 films depuis l'API et on les transmet ici pour que le component FilmList les affiche*/
                navigation={this.props.navigation} /* Ici on transmet les informations de navigation 
                pour permettre au component FilmList de naviguer vers le détail d'un film */
                loadFilms={this._loadFilms} /* _loadFilm charge les films suivants, ça concerne l'API, le component 
                FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et 
                c'est le component Search qui lui fournira les films suivants */
                page={this.page}//on indique la page a afficher
                totalPages={this.totalPages} /* les infos page et totalPages vont être utile, côté component FilmList, 
                pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page */
            />

            {this._displayLoading()}
         </View>
        )
    }
}

const styles = StyleSheet.create ({
    main_container: {
        flex: 1,
        //marginTop: 20// -> plus besoin si on utilise la navigation car elle decale tout toute seul
    },
    TextInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute', //permet de mettre ma vue de chargement par dessus mon ecran
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})

/*const myStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}*/

/*
<FlatList
                data={this.state.films} //Données que l'on souhaite afficher ||| on utilise notre tableau de films ds notre liste de films
                extraData={this.props.favoritesFilm} //extraData rajoute une donne, des qu'elle est changer notre flatList est re rendu (utile qd notre 1ere data ne change pas)
                keyExtractor={(item) => item.id.toString()} //React-native demande obligatoirement une key pr une liste
                renderItem={({item}) => 
                <FilmItem 
                //on cree notre propore props film qui ira ds notre component fils -> FilmItem
                    film={item} 
                    // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                    isFilmFavorite = {(
                        this.props.favoritesFilm.findIndex(
                            film => film.id === item.id) !== -1) ? true : false
                        }
                        _displayDetailForFilm= {this._displayDetailForFilm}
                                    //Rendu des données de notre list
                                    //on cree notre propore props film
                                    //inconveniant des props c'est qu'elles sont definies par le parent
                        />
                    }
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {
                            //  On vérifie également qu'on n'a pas atteint la fin de la 
                            //    pagination (totalPages) avant de charger plus d'éléments
                            this._loadFilms()
                        }
                    }}
                />
*/

//export default connect(myStateToProps)(Search)
export default Search