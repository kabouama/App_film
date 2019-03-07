// Components/FilmItem.js
//           <Text style={styles.title_text}>Titre du film</Text>

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import { AnimatedRegion } from 'react-native-maps';
//import { connect } from 'react-redux'
import FadeIn from '../Animations/FadeIn'


class FilmItem extends React.Component {

  /*constructor(props) {
    super(props)
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get('window'). width)
    }
  }

  componentDidMount() { //une fois que le component est monter
    Animated.spring( //effet d'elasticité
      this.state.positionLeft,
      {
        toValue: 0
      }
    ).start() //lance notre animation
  }*/

  _MaFonctionqdTapui() {
    var imageSource = require('../Images/ic_favorite.png')
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style = {styles.mon_coeur}
          source = {imageSource}
        />
      )
    }
  }

  render() {
    const { film, _displayDetailForFilm } = this.props//.film //on recupere notre props film qui est dans search
    //on recupere aussi la fonction displayDetailForFilm qui est dans 'Search.js'
    return (
        <FadeIn>
          <TouchableOpacity style={styles.main_container}
                            onPress= {() => _displayDetailForFilm(film.id)}>
              <Image
                  style={styles.image}
                  source={{uri: getImageFromApi(film.poster_path)}}
              />
              <View style={styles.content_container}>
                  <View style={styles.header_container}>
                    
                    {this._MaFonctionqdTapui()}

                    <Text style={styles.title_text}>{film.title}</Text>
                    <Text style={styles.vote_text}>{film.vote_average}</Text>
                  </View>
                  <View style={styles.description_container}>
                    <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    {
                        /* La propriété numberOfLines permet de couper un texte si celui-ci
                        est trop long, il suffit de définir un nombre maximum de ligne */
                    }
                  </View>
                  <View style={styles.date_container}>
                    <Text style={styles.date_text}>{film.release_date}</Text>
                  </View>
              </View>
          </TouchableOpacity>
        </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row', //row -> alignement horizontal || column par default || on change le flex du component parent pour aligner ses fils
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5, //marge de tout les cotes : top, right, left, bot
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
  },
  title_text: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap', // mets le titre a la ligne si c'est trop long
    paddingRight: 5,
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
    //marginRight: 20,
  },
  description_container: {
      flex: 7,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
      flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  mon_coeur: {
    width : 25,
    height : 25,
    marginRight: 5
  }
})

export default FilmItem