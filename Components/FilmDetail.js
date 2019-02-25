import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

class FilmDetail extends React.Component {
    
        //console.log(this.props.navigation)
        
    constructor(props) {
        super(props)
        this.state = { // on va initialiser notre state
            film: undefined,
            isLoading: true
        }
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
    render() {
        const idFilm = this.props.navigation.getParam('idFilm')
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute', //permet de mettre ma vue de chargement par dessus mon ecran
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
})

export default FilmDetail