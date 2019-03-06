
import React from 'react'
import FilmList from './FilmList'
import { View, Button, StyleSheet, ActivityIndicator, FlatList, TextInput } from 'react-native'
import { getAllFilms, getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import Search from './Search'
import { connect } from 'react-redux'
import FilmItem from './FilmItem'

class AllFilms extends React.Component {

    constructor(props) { //comment les component font passer des props les uns entre les autres
        super(props) // on reecri le constructeur de notre component 'search'
        //this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        // Ici on va créer les propriétés de notre component custom Search
        this.state = { //la state de notre component est utiliser pr stocker qlq infos de l'api
            films: [],
            isLoading: false
        } // on definit notre state avec un tableau de film

        this._loadFilms = this._loadFilms.bind(this)
        //Ca permet de binder une fonction pour l'utiliser dans d'autres component et qu'elle garde sa valeur
    }

    _loadFilms() { // fonction qu'on va appeler qd on clic sur recherche donc dans -> onpress
        //if (this.searchedText.length > 0) {//on check si on a bien ecrit quelque chose
            this.setState({ isLoading: true })
            getAllFilms(this.page + 1).then(data => {
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
    //}
    }
/*
    _loadFilms2() {
        getAllFilms().then(data =>
            this.setState({ 
                films : data.results,
                isLoading: true
        }))
    }
*/
   /* _searchTextInputChanged(text) {
        this.searchedText = text
    }*/

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: [],
        }, () => {
            this._loadFilms()
        })
    }
/*
    _displayDetailForFilm = (idFilm) => { //fonction prend en param idFilm /-> (sythaxe tres bizarre)
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

    componentWillMount(){
        this._searchFilms()
    }

    render () {
        //const { film, _displayDetailForFilm, _searchFilms, _displayLoading } = this.props
        //console.log("--->" + this.state)
        {this._searchFilms}
        return (
            
            <View style={styles.main_container}>
                      
            
                
                

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

export default AllFilms