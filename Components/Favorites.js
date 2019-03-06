import React from 'react'
import { StyleSheet, Text } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'

class Favorites extends React.Component {

    render() {
        return (
            <FilmList
                films={this.props.favoritesFilm}
                navigation={this.props.navigation}
                loadFilms={this.props._loadFilms}
                favoriteList={true} /* Ici on est bien dans le cas de la liste des films favoris. Ce booléen à true 
                permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur
                la vue Favoris.*/
            />
//            <Text> Mes Favoris </Text>
        )
    }
}

const style = StyleSheet.create({})

const myStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(myStateToProps)(Favorites)