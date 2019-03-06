import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, /*Button, Dimensions*/ } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from "moment"
import numeral from "numeral"
import { connect } from 'react-redux' /*connecte le store a notre component FilmDetail 
                                    ---->(regarder en bas de la page dans le 'export')*/
//import { ScrollView } from 'react-native-gesture-handler';

class FilmDetail extends React.Component {
    
        //console.log(this.props.navigation)
        
    constructor(props) {
        super(props)
        this.state = { // on va initialiser notre state
            film: undefined,
            isLoading: true,
            currentDate: new Date(),
            
        }
    }

    componentDidMount() { //On surcharge le cycle, a voir dans le screen d'OpenClassRoom
        //console.log("filmdetail monté")

    /*const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
      // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      })
      return
    }*/

    // Le film n'est pas dans nos favoris, on n'a pas son détail
    // On appelle l'API pour récupérer son détail
    
    this.setState({ isLoading: true })

        getFilmDetailFromApi(this.props.navigation.getParam('idFilm')).then(data => {
            this.setState({
                film: data,
                isLoading: false //remet notre chargement a false
            })
        })
    }

    /*componentDidUpdate() {
        console.log("componentDidUpdate : ")
        console.log(this.props.favoritesFilm)
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

    _toggleFavorite() { // Definition de notre action pour les favoris ici
                        // notre action doit posseder un type et une valeur
                        // on a definit l'action 'TOGGLE_FAVORITE' ds favoriteReducer.js
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film}
        this.props.dispatch(action) /* dispatch permet de distribuer notre action au Store et 
                                        a ses reducer. Diaspatch et dispo directement
                                         car on a utilise la fonction connect
                                         react-native mets alors directement dispatch a disposition
                                         */
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            //Film dans nos favoris
            sourceImage = require('../Images/ic_favorite.png')
        }
        return (
            <Image
                style = {styles.favorite_image}
                source = {sourceImage}
            />
        )
        
    }

    //TouchableOpacity replae 'Boutton' (ca permet de custom nos boutons)
    _displayFilm() {
        const { film } = this.state
        if (this.state.film != undefined) {
            return (
                <ScrollView style={styles.ScrollView_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title_text}> {this.state.film.title} </Text>

                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                            {this._displayFavoriteImage()}
                    </TouchableOpacity>


                    <Text style={styles.description}> 
                        {this.state.film.overview}
                    </Text>
                    <View style={styles.view_info}>
                        <Text style={styles.detail}>
                            Sorti le {moment(new 
                                Date(this.state.film.release_date)).format('DD/MM/YYYY')}
                        </Text>
                        <Text style={styles.detail}> Note: {this.state.film.vote_average} / 10</Text>
                        <Text style={styles.detail}> Nombre de votes: {this.state.film.vote_count}</Text>
                        <Text style={styles.detail}> Budget: {numeral(
                            this.state.film.budget).format('0, 0')} $
                            
                        </Text>
                        <Text style={styles.detail}> Genre(s): {film.genres.map(function(genre){
                                //map parcour les genres et companies
                                //.join affiche les element les uns a la suite separant par un '/'
                                return (genre.name);
                            }).join(" / ")}
                        </Text>
                        <Text style={styles.detail}> 
                            Companie(s): {film.production_companies.map(function(weshalors){
                                return (weshalors.name);
                            }).join(" / ")}
                        </Text>
                    </View>
                </ScrollView>                
            )
        }
    }

    render() {
        //console.log(this.props)
        //console.log("filmdetail rendu")
        //const idFilm = this.props.navigation.getParam('idFilm')     
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }
}

//const win = Dimensions.get('window');
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.14)'
    },
    loading_container: {
        position: 'absolute', //permet de mettre ma vue de chargement par dessus mon ecran
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      },
      crollView_container: {
          flex: 1
      },
      image: {
        alignSelf: 'stretch',
        //width: win.width,
        //height: win.height,
        //width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
      },
      title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
      },
      description: {
        margin: 5,
        fontStyle: 'italic',
        color: 'grey',
        fontWeight: 'bold'
      },
      view_info: {
        marginTop: 15,
        //backgroundColor: 'red'
      },
      detail: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
      },
      favorite_container: {
        alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
      },
      favorite_image: {
          width: 40,
          height: 40
      }
})

/*  on connecte le state de notre appli au component Filmdetail grace a la fonction mapStateToProps
    C'est la doc de react-redux qui nous dit d'utiliser cette fonction pour les connecter
*/
const   mapStateToProps = (state) => { //state correspond au state global
    //return state ---> si on s'arrete là on connecte TOUT le state de l'appli avec le component
    return {
        favoritesFilm: state.favoritesFilm  // mais la on connecte que ce qui nous interesse
                                            // Tres important ds le cas ou on veut seulement 1 info
    }
}
/*  En retournant le state de notre appli ds la fonction mapStateToProps
    on vient de mapper le state de notre appli dans le props du comonent FilmDetail
    alors maintenant -> ds le props du component FilmDetail, on a acces
    au state de l'appli et donc aux films favoris
*/

export default connect(mapStateToProps)(FilmDetail) 
// ici. On connecte le state de l'application avec les props du component FilmDetail.
//on connecte notre store a notre component FilmDetail
/*  si on sopecifier 'mapStateToProps dans la fonction 'connect', automatiquementm le component
    est abonné au changement du store Redux ---> Des qu'il y a un changement notre component 
    en sera informé 
    ||
    la valeur retournee par la fonction 'mapStateToProps est mappeée (fusionné) 
    aux props de notre component
*/

/* on peut enlever le const mapStateToProps et faire : 
        export default connect(state => state)(FilmDetail)*/

/*  Notre store Redux et son reducer sont prêts et ils
    sont capables de fournir le state global à nos components abonnés.
*/