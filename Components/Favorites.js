import React from 'react'
import { StyleSheet, Text } from 'react-native'
import FilmList from './FilmList'

class Favorites extends React.Component {

    render() {
        return (
            <FilmList
                films={this.props.films}
                navigation={this.props.navigation}
            />
//            <Text> Mes Favoris </Text>
        )
    }
}

const style = StyleSheet.create({})

export default Favorites