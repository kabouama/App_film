import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, /*Dimensions*/ } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
//import { ScrollView } from 'react-native-gesture-handler';

class FilmDetail extends React.Component {
    
        //console.log(this.props.navigation)
        
    constructor(props) {
        super(props)
        this.state = { // on va initialiser notre state
            film: undefined,
            isLoading: true
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
                    <Text style={styles.text_container}> {this.state.film.title} </Text>
                    <Text style={styles.detail}> 
                        {this.state.film.overview}
                    </Text>
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
      text_container: {
        fontSize: 30,
        margin: 5,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      detail: {
        margin: 5,
        fontStyle: 'italic',
        color: 'grey',
        fontWeight: 'bold'
      }
})

export default FilmDetail