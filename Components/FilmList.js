import React from 'react'
import { StyleSheet, FlatList, View, Text, Button } from 'react-native'
import FilmItem from './FilmItem'
//import { getFilmsFromApiWithSearchedText, getAllFilms, getAllFilms2, getAllFilms3 } from '../API/TMDBApi'
import { connect } from 'react-redux' 


class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }

    _displayDetailForFilm = (idFilm) => { //fonction prend en param idFilm /-> (sythaxe tres bizarre)
        //console.log("display film with id" + idFilm)
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    /*_loadFilms() {
        //getFilmsFromApiWithSearchedText("Harry").then(data => 
        getAllFilms().then(data =>
            this.setState({ 
                films : data.results,
                isLoading: false
            }))
    }*/

    /*    getAllFilms2().then(data =>
            this.setState({ 
                films : data.results + this.films,
                isLoading: false
            }))
   *//*     getAllFilms3().then(data =>
            this.setState({ 
                films : data.results,
                isLoading: false
            }))
            }*/

    /*_searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: [],
        }, () => {
            this._loadFilms()
        })
    }*/

    render() {
        return (
        //    <View>
                <FlatList
                    data={this.props.films} //Données que l'on souhaite afficher ||| on utilise notre tableau de films ds notre liste de films
                    extraData={this.props.favoritesFilm} //extraData rajoute une donne, des qu'elle est changer notre flatList est re rendu (utile qd notre 1ere data ne change pas)
                    keyExtractor={(item) => item.id.toString()} //React-native demande obligatoirement une key pr une liste
                    renderItem={({item}) => (
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
                    )}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.props.page < this.props.totalPages) {
                            /*  On vérifie également qu'on n'a pas atteint la fin de la 
                                pagination (totalPages) avant de charger plus d'éléments*/
                // On appelle la méthode loadFilm du component Search pour charger plus de films
                            this.props._loadFilms()
                        }
                    }}
                /> 
        //    </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const myStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
/*
<Button title="Rechercher" onPress={() => this._loadFilms()}/>
                
                <FlatList
                    //style={styles.list}
                    data={this.state.films}
                    //data={this.props.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                        <FilmItem
                            film={item}
                            _displayDetailForFilm = {this._displayDetailForFilm}
                        />
                        
                    }
                />*/

export default connect(myStateToProps)(FilmList)