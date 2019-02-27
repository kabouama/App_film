import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, /*Dimensions*/ } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from "moment"
import numeral from "numeral"
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

    componentDidMount() { //On surcharge le cycle, a voir dans le screen d,OpenClassRoom
        //console.log("filmdetail monté")
        getFilmDetailFromApi(this.props.navigation.getParam('idFilm')).then(data => {
            this.setState({
                film: data,
                isLoading: false //remet notre chargement a false
            })
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

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
      }
})

export default FilmDetail